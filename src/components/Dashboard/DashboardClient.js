"use client";
import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation.component";
import Footer from "@/components/Footer/Footer.component";
import { CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, Card, CardContent } from "@mui/material";
import { User, LogOut, BookOpen, Clock, Award, ChevronRight } from "lucide-react";
import { ref, get, set } from "firebase/database";
import { firebaseDatabase } from "@/backend/firebaseHandler";
import Styles from "../../app/dashboard/Dashboard.module.css";
import { QuizSessionContext } from "../../app/context/QuizSessionContext";

const DashboardClient = () => {
    const { user, userData, setUserData, logout, loading } = useAuth();
    const router = useRouter();
    const [quizContext, setQuizContext] = useContext(QuizSessionContext);
    const [activeChildId, setActiveChildId] = useState(null);
    const [reports, setReports] = useState(null);
    const [fetchingReports, setFetchingReports] = useState(false);
    const [reportsCache, setReportsCache] = useState({});

    const [addChildOpen, setAddChildOpen] = useState(false);
    const [childForm, setChildForm] = useState({
        name: "",
        email: "",
        schoolName: "",
        city: "",
        grade: ""
    });

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/");
        }
    }, [user, loading, router]);

    // Initialize active child based on userData and persisted preference
    useEffect(() => {
        if (!user || !userData || !userData.children) return;

        const phoneKey = user.phoneNumber ? user.phoneNumber.slice(-10) : "";
        const storedChildId = typeof window !== "undefined"
            ? window.localStorage.getItem(`activeChild_${phoneKey}`)
            : null;

        const childKeys = Object.keys(userData.children || {});
        if (storedChildId && childKeys.includes(storedChildId)) {
            setActiveChildId(storedChildId);
        } else if (childKeys.length > 0) {
            setActiveChildId(childKeys[0]);
        }
    }, [user, userData]);

    // Fetch reports for the selected child, with simple per-child caching
    useEffect(() => {
        const fetchReports = async () => {
            if (user?.phoneNumber && activeChildId) {
                setFetchingReports(true);
                try {
                    const phoneNumber = user.phoneNumber.slice(-10);
                    const reportsRef = ref(firebaseDatabase, `NMD_2025/Reports/${phoneNumber}/${activeChildId}`);
                    const snapshot = await get(reportsRef);
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setReports(data);
                        setReportsCache((prev) => ({
                            ...prev,
                            [activeChildId]: data,
                        }));
                    } else {
                        setReports(null);
                        setReportsCache((prev) => ({
                            ...prev,
                            [activeChildId]: null,
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching reports:", error);
                } finally {
                    setFetchingReports(false);
                }
            }
        };
        if (user && activeChildId) {
            // If we have a cached value for this child, use it immediately for snappy UI
            if (reportsCache.hasOwnProperty(activeChildId)) {
                setReports(reportsCache[activeChildId]);
                setFetchingReports(false);
            } else {
                fetchReports();
            }
        }
    }, [user, activeChildId, reportsCache]);

    const children = userData?.children || null;
    const activeChild = children && activeChildId ? children[activeChildId] : null;

    if (loading || !user) {
        return (
            <div className={Styles.loadingContainer}>
                <CircularProgress />
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        router.replace("/");
    };

    const handleChildChange = (event) => {
        const newChildId = event.target.value;
        setActiveChildId(newChildId);
        if (user?.phoneNumber) {
            const phoneKey = user.phoneNumber.slice(-10);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(`activeChild_${phoneKey}`, newChildId);
            }
        }
    };

    const handleOpenAddChild = () => {
        setChildForm({
            name: "",
            email: "",
            schoolName: "",
            city: "",
            grade: ""
        });
        setAddChildOpen(true);
    };

    const handleSaveChild = async () => {
        if (!user?.phoneNumber || !userData) return;

        const { name, schoolName, city, grade } = childForm;
        if (!name || !schoolName || !city || !grade) {
            return;
        }

        const phoneNumber = user.phoneNumber.slice(-10);
        const childId = `child_${Date.now()}`;
        const childProfile = {
            ...childForm,
            phoneNumber,
            createdAt: new Date().toISOString()
        };

        try {
            const childRef = ref(firebaseDatabase, `NMD_2025/Registrations/${phoneNumber}/children/${childId}`);
            await set(childRef, childProfile);

            setUserData((prev) => {
                const prevChildren = prev?.children || {};
                return {
                    ...(prev || {}),
                    parentPhone: phoneNumber,
                    children: {
                        ...prevChildren,
                        [childId]: childProfile
                    }
                };
            });

            setActiveChildId(childId);
            const phoneKey = phoneNumber;
            if (typeof window !== "undefined") {
                window.localStorage.setItem(`activeChild_${phoneKey}`, childId);
            }
            setAddChildOpen(false);
        } catch (error) {
            console.error("Error saving child profile:", error);
        }
    };

    return (
        <div className={Styles.pageWrapper}>
            <Navigation />

            <div className={Styles.dashboardContainer}>
                {/* Profile Section */}
                <section className={Styles.profileSection}>
                    <div className={Styles.profileHeader}>
                        <div className={Styles.avatar}>
                            <User size={40} color="white" />
                        </div>

                        {children && (
                            <div className={Styles.childSelectorRow}>
                                <FormControl size="small" className={Styles.childSelector}>
                                    <InputLabel>Child Profile</InputLabel>
                                    <Select
                                        value={activeChildId || ""}
                                        label="Child Profile"
                                        onChange={handleChildChange}
                                    >
                                        {Object.entries(children).map(([id, child]) => (
                                            <MenuItem key={id} value={id}>
                                                {child.name} ({child.grade})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="outlined"
                                    onClick={handleOpenAddChild}
                                    className={Styles.addChildButton}
                                >
                                    Add Child
                                </Button>
                            </div>
                        )}
                        <div className={Styles.profileInfo}>
                            <h1>{activeChild?.name || "Student"}</h1>
                            <p>{activeChild?.grade} • {activeChild?.schoolName}</p>
                        </div>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<LogOut size={18} />}
                            onClick={handleLogout}
                            className={Styles.logoutButton}
                        >
                            Sign Out
                        </Button>
                    </div>

                    <div className={Styles.statsGrid}>
                        <div className={Styles.statCard}>
                            <BookOpen className={Styles.statIcon} />
                            <div>
                                <h3>Assessment Status</h3>
                                <p>{reports ? "Completed" : "Not Started"}</p>
                            </div>
                        </div>
                        <div className={Styles.statCard}>
                            <Clock className={Styles.statIcon} />
                            <div>
                                <h3>Last Active</h3>
                                <p>{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reports Section */}
                <section className={Styles.reportsSection}>
                    <h2>Assessment History</h2>

                    {fetchingReports && !reports ? (
                        <div className={Styles.loader}>
                            <CircularProgress size={24} />
                            <div className={Styles.loaderText}>Loading report...</div>
                        </div>
                    ) : reports ? (
                        <Card className={`${Styles.reportCard} ${fetchingReports ? Styles.reportCardLoading : ""}`}>
                            <CardContent className={Styles.reportContent}>
                                <div className={Styles.reportInfo}>
                                    <div className={Styles.reportIcon}>
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <h3>Math Skill Proficiency Test</h3>
                                        <p className={Styles.reportDate}>
                                            {new Date(reports.timestamp).toLocaleDateString()} • {new Date(reports.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                                <div className={Styles.reportScore}>
                                    <div className={Styles.scoreBadge}>
                                        {reports.summary.accuracyPercent}% Score
                                    </div>
                                    <Button
                                        endIcon={<ChevronRight />}
                                        onClick={() => router.push("/quiz/quiz-result")}
                                    >
                                        View Full Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className={Styles.emptyState}>
                            <img src="/empty-state.svg" alt="No assessments" className={Styles.emptyImage} />
                            {/* Fallback if image missing, just text */}
                            <p>You haven't taken the assessment yet.</p>
                            <Button
                                variant="contained"
                                className={Styles.startBtn}
                                onClick={() => {
                                    if (!user || !activeChild || !user.phoneNumber) {
                                        router.push("/");
                                        return;
                                    }
                                    try {
                                        if (typeof window !== "undefined") {
                                            window.localStorage.removeItem("quizSession");
                                        }
                                    } catch (e) {
                                        // ignore storage errors
                                    }
                                    const phoneNumber = user.phoneNumber.slice(-10);
                                    const userDetails = {
                                        ...activeChild,
                                        phoneNumber,
                                        childId: activeChildId,
                                    };
                                    setQuizContext({ userDetails, questionPaper: null });
                                    router.push("/quiz");
                                }}
                            >
                                Start Assessment
                            </Button>
                        </div>
                    )}
                </section>
            </div>

            <Footer />

            <Dialog
                open={addChildOpen}
                onClose={() => setAddChildOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Add Child Profile</DialogTitle>
                <DialogContent>
                    <div className={Styles.addChildForm}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            margin="normal"
                            value={childForm.name}
                            onChange={(e) => setChildForm({ ...childForm, name: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Email (optional)"
                            type="email"
                            margin="normal"
                            value={childForm.email}
                            onChange={(e) => setChildForm({ ...childForm, email: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="School Name"
                            margin="normal"
                            value={childForm.schoolName}
                            onChange={(e) => setChildForm({ ...childForm, schoolName: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="City"
                            margin="normal"
                            value={childForm.city}
                            onChange={(e) => setChildForm({ ...childForm, city: e.target.value })}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Grade</InputLabel>
                            <Select
                                value={childForm.grade}
                                label="Grade"
                                onChange={(e) => setChildForm({ ...childForm, grade: e.target.value })}
                            >
                                {[...Array(10)].map((_, i) => (
                                    <MenuItem key={i + 1} value={`Grade ${i + 1}`}>
                                        Grade {i + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={handleSaveChild}
                            disabled={!childForm.name || !childForm.schoolName || !childForm.city || !childForm.grade}
                            sx={{ mt: 2 }}
                        >
                            Save Child
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DashboardClient;
