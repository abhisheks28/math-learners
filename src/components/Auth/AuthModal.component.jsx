"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, CircularProgress, TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { X, Phone, User, Mail, School, MapPin, GraduationCap } from "lucide-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, firebaseDatabase } from "@/backend/firebaseHandler";
import { ref, set, get } from "firebase/database";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import Styles from "./AuthModal.module.css";

const AuthModal = ({ open, onClose, onSuccess }) => {
    const [step, setStep] = useState("PHONE"); // PHONE, OTP, REGISTER
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const { setUserData } = useAuth();

    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        schoolName: "",
        city: "",
        grade: ""
    });

    useEffect(() => {
        if (!open) {
            // Reset state when modal closes
            setStep("PHONE");
            setPhoneNumber("");
            setOtp("");
            setLoading(false);
            setRegistrationData({
                name: "",
                email: "",
                schoolName: "",
                city: "",
                grade: ""
            });
        }
    }, [open]);

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    };

    const handleSendOtp = async () => {
        if (phoneNumber.length !== 10) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+91" + phoneNumber;

        try {
            const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
            setConfirmationResult(confirmation);
            setStep("OTP");
            toast.success("OTP sent successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send OTP. Please try again.");
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;

            // Check if user profile exists
            const userRef = ref(firebaseDatabase, `NMD_2025/Registrations/${phoneNumber}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                // User exists, login success
                const rawData = snapshot.val();

                // Normalize to multi-child format to match AuthContext
                // Legacy: single profile object
                // New: { parentPhone, children: { childId: { ...profile } } }
                let normalizedData;
                if (rawData && rawData.children) {
                    normalizedData = rawData;
                } else if (rawData) {
                    normalizedData = {
                        parentPhone: phoneNumber,
                        children: {
                            default: rawData
                        }
                    };
                } else {
                    normalizedData = null;
                }

                setUserData(normalizedData);
                toast.success("Logged in successfully!");
                onSuccess && onSuccess(normalizedData);
                onClose();
            } else {
                // User does not exist, move to registration
                setStep("REGISTER");
            }
        } catch (error) {
            console.error(error);
            toast.error("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        const { name, email, schoolName, city, grade } = registrationData;
        // Email is optional; other fields are required
        if (!name || !schoolName || !city || !grade) {
            toast.error("Please fill all fields");
            return;
        }

        setLoading(true);
        try {
            const childId = "default";
            const childProfile = {
                ...registrationData,
                phoneNumber: phoneNumber,
                createdAt: new Date().toISOString()
            };

            const userData = {
                parentPhone: phoneNumber,
                children: {
                    [childId]: childProfile
                }
            };

            await set(ref(firebaseDatabase, `NMD_2025/Registrations/${phoneNumber}`), userData);
            setUserData(userData);
            toast.success("Profile created successfully!");
            onSuccess && onSuccess(userData);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: Styles.modalPaper
            }}
        >
            <DialogTitle className={Styles.modalHeader}>
                <div className={Styles.headerContent}>
                    {step === "PHONE" && "Sign In / Register"}
                    {step === "OTP" && "Verify OTP"}
                    {step === "REGISTER" && "Complete Profile"}
                </div>
                <IconButton onClick={onClose} className={Styles.closeButton}>
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            <DialogContent className={Styles.modalContent}>
                <div id="recaptcha-container"></div>

                {step === "PHONE" && (
                    <div className={Styles.stepContainer}>
                        <p className={Styles.stepDescription}>Enter your mobile number to get started</p>
                        <div className={Styles.inputGroup}>
                            <Phone className={Styles.inputIcon} size={20} />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                InputProps={{
                                    startAdornment: <span className={Styles.prefix}>+91</span>,
                                }}
                                className={Styles.textField}
                            />
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSendOtp}
                            disabled={loading || phoneNumber.length !== 10}
                            className={Styles.actionButton}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
                        </Button>
                    </div>
                )}

                {step === "OTP" && (
                    <div className={Styles.stepContainer}>
                        <p className={Styles.stepDescription}>Enter the 6-digit code sent to +91 {phoneNumber}</p>
                        <TextField
                            fullWidth
                            label="OTP"
                            variant="outlined"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className={Styles.textField}
                            autoFocus
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleVerifyOtp}
                            disabled={loading || otp.length !== 6}
                            className={Styles.actionButton}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Continue"}
                        </Button>
                        <Button
                            onClick={() => setStep("PHONE")}
                            className={Styles.backButton}
                            disabled={loading}
                        >
                            Change Phone Number
                        </Button>
                    </div>
                )}

                {step === "REGISTER" && (
                    <div className={Styles.stepContainer}>
                        <p className={Styles.stepDescription}>Tell us a bit about yourself</p>
                        <form className={Styles.formGrid}>
                            <div className={Styles.inputGroup}>
                                <User className={Styles.inputIcon} size={20} />
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={registrationData.name}
                                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                                />
                            </div>
                            <div className={Styles.inputGroup}>
                                <Mail className={Styles.inputIcon} size={20} />
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    value={registrationData.email}
                                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                                />
                            </div>
                            <div className={Styles.inputGroup}>
                                <School className={Styles.inputIcon} size={20} />
                                <TextField
                                    fullWidth
                                    label="School Name"
                                    value={registrationData.schoolName}
                                    onChange={(e) => setRegistrationData({ ...registrationData, schoolName: e.target.value })}
                                />
                            </div>
                            <div className={Styles.inputGroup}>
                                <MapPin className={Styles.inputIcon} size={20} />
                                <TextField
                                    fullWidth
                                    label="City"
                                    value={registrationData.city}
                                    onChange={(e) => setRegistrationData({ ...registrationData, city: e.target.value })}
                                />
                            </div>
                            <div className={Styles.inputGroup}>
                                <GraduationCap className={Styles.inputIcon} size={20} />
                                <FormControl fullWidth>
                                    <InputLabel>Grade</InputLabel>
                                    <Select
                                        value={registrationData.grade}
                                        label="Grade"
                                        onChange={(e) => setRegistrationData({ ...registrationData, grade: e.target.value })}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <MenuItem key={i + 1} value={`Grade ${i + 1}`}>Grade {i + 1}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleRegister}
                            disabled={loading}
                            className={Styles.actionButton}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Profile"}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
