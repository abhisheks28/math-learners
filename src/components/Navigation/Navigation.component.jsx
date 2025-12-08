"use client";
import { useContext, useState, useEffect } from "react";
import Styles from "./Navigation.module.css";
import { Play, Phone, User } from 'lucide-react'
import { Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
import AuthModal from "../Auth/AuthModal.component";
import { useAuth } from "@/context/AuthContext";
import { QuizSessionContext } from "../../app/context/QuizSessionContext";
import { getUserDatabaseKey, firebaseDatabase } from "@/backend/firebaseHandler";
import { get, ref } from "firebase/database";

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [hasSession, setHasSession] = useState(false);
    const { user, userData } = useAuth();
    const router = useRouter();
    const [quizContext, setQuizContext] = useContext(QuizSessionContext) || [null, () => { }]; // Check if context exists to avoid crash outside provider

    useEffect(() => {
        // Check for active quiz session or stored child session
        const checkSession = () => {
            if (typeof window !== "undefined") {
                const quizSession = window.localStorage.getItem("quizSession");
                // functionality to check if user is logged in via firebase is handled by useAuth
                // but sometimes we want to show profile if we have local user details
                if (quizSession) {
                    try {
                        const parsed = JSON.parse(quizSession);
                        if (parsed?.userDetails) {
                            setHasSession(true);
                            return;
                        }
                    } catch (e) { }
                }
            }
            setHasSession(false);
        };
        checkSession();
    }, [user]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <>
            <div className={`${Styles.navigationContainer} ${scrolled ? Styles.scrolled : ''}`}>
                <div className={Styles.logoContainer} onClick={() => router.push("/")}>
                    <div className={Styles.brainWrap} aria-hidden>
                        <img src="/LearnersLogoTransparent.png" className={Styles.brainIcon} />
                    </div>
                    <div>
                        <h3 className={Styles.logoTitle}>Math Skill Conquest</h3>
                        {/* <p className={Styles.logoSubtitle}>Educational Assessment</p> */}
                    </div>
                </div>
                <div className={Styles.navActionContainer}>
                    <Tooltip title="Take Test" arrow>
                        <button
                            onClick={async () => {
                                // Check if we have any user data (Firebase auth OR local session)
                                const effectiveUserData = userData || (typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("quizSession") || "{}")?.userDetails : null);

                                if (user || effectiveUserData || hasSession) {
                                    // Logic to correctly initialize session for the active child
                                    try {
                                        // Robust user key retrieval
                                        let userKey = null;
                                        if (user) {
                                            userKey = getUserDatabaseKey(user);
                                        }
                                        if (!userKey && effectiveUserData) {
                                            userKey = effectiveUserData.userKey || effectiveUserData.phoneNumber || effectiveUserData.parentPhone || effectiveUserData.parentEmail;
                                        }

                                        if (!userKey) {
                                            console.warn("Navigation: No userKey found, cannot start test correctly.");
                                            // If no userKey but has session, just navigate
                                            router.push("/quiz");
                                            return;
                                        }

                                        const children = effectiveUserData?.children || null;
                                        const childKeys = children ? Object.keys(children) : [];

                                        // CRITICAL: Get active child from localStorage FIRST, then fallback to first child
                                        let activeChildId = null;

                                        // Prefer stored active child
                                        if (typeof window !== "undefined" && userKey) {
                                            const storedChildId = window.localStorage.getItem(`activeChild_${userKey}`);
                                            const lastActiveChild = window.localStorage.getItem('lastActiveChild'); // Fallback

                                            // Prioritize specific key, then fallback
                                            if (storedChildId && childKeys.includes(storedChildId)) {
                                                activeChildId = storedChildId;
                                            } else if (lastActiveChild && childKeys.includes(lastActiveChild)) {
                                                activeChildId = lastActiveChild;
                                            }
                                        }

                                        // Only use first child as last resort
                                        if (!activeChildId && childKeys.length > 0) {
                                            activeChildId = childKeys[0];
                                        }

                                        if (children && activeChildId) {
                                            const activeChild = children[activeChildId];
                                            const userDetails = {
                                                ...activeChild,
                                                phoneNumber: userKey,
                                                childId: activeChildId,
                                            };

                                            // Reset session for this specific child
                                            if (setQuizContext) {
                                                setQuizContext({ userDetails, questionPaper: null });
                                            }
                                            if (typeof window !== "undefined") {
                                                window.localStorage.removeItem("quizSession");
                                            }
                                        } else {
                                            // Fallback: If we couldn't rebuild context (e.g. missing userData),
                                            // at least ensure we don't load a STALE session for a DIFFERENT child.
                                            if (typeof window !== "undefined" && activeChildId) {
                                                try {
                                                    const storedSession = window.localStorage.getItem("quizSession");
                                                    if (storedSession) {
                                                        const parsed = JSON.parse(storedSession);
                                                        // If stored session is for a different child, KILL IT.
                                                        if (parsed?.userDetails?.childId && parsed.userDetails.childId !== activeChildId) {
                                                            window.localStorage.removeItem("quizSession");
                                                        }
                                                    }
                                                } catch (e) {
                                                    // On error, better to clear than show wrong data
                                                    window.localStorage.removeItem("quizSession");
                                                }
                                            }
                                        }
                                    } catch (e) {
                                        console.error("Navigation start test error:", e);
                                    }
                                    router.push("/quiz");
                                } else {
                                    setAuthModalOpen(true);
                                }
                            }}
                            style={{ backgroundColor: "#3c91f3ff", color: "white" }}
                            className={Styles.navButton}
                        >
                            <Play size={16} />
                            <span className={Styles.buttonText}>Take Test</span>
                        </button>
                    </Tooltip>

                    {user || hasSession ? (
                        <Tooltip title="View Dashboard" arrow>
                            <button onClick={() => router.push("/dashboard")} className={`${Styles.navButton} ${Styles.outlined}`}>
                                <User size={16} />
                                <span className={Styles.buttonText}>Profile</span>
                            </button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Sign In" arrow>
                            <button onClick={() => setAuthModalOpen(true)} className={`${Styles.navButton} ${Styles.outlined}`}>
                                <User size={16} />
                                <span className={Styles.buttonText}>Sign In</span>
                            </button>
                        </Tooltip>
                    )}

                    <Tooltip title="Reach out to us" arrow>
                        <button onClick={() => window.location.href = "tel:+919916933202"} className={`${Styles.navButton} ${Styles.outlined}`}>
                            <Phone size={16} />
                            <span className={Styles.buttonText}>Reach Us</span>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    )
}

export default Navigation;