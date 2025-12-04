import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Chip,
    Box,
    TextField,
    MenuItem,
    Grid,
    FormControl,
    InputLabel,
    Select,
    Slider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Avatar,
    Divider,
    useTheme
} from '@mui/material';
import {
    Eye,
    User,
    Mail,
    Phone,
    Calendar,
    Award,
    Download,
    X,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { useState, useMemo, useRef } from 'react';

const StudentList = ({ students }) => {
    const theme = useTheme();
    const chartRef = useRef(null);
    const [selectedGrade, setSelectedGrade] = useState('All');
    const [minScore, setMinScore] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Get unique grades for filter dropdown
    const uniqueGrades = useMemo(() => {
        const grades = new Set(students.map(s => s.grade).filter(Boolean));
        return Array.from(grades).sort();
    }, [students]);

    // Filter students
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const gradeMatch = selectedGrade === 'All' || student.grade === selectedGrade;
            const score = (student.marks !== null && student.marks !== undefined) ? student.marks : 0;
            const scoreMatch = score >= minScore;
            return gradeMatch && scoreMatch;
        });
    }, [students, selectedGrade, minScore]);

    const handleView = (student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
    };

    const handleDownload = async () => {
        if (!selectedStudent) return;

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // --- Design Elements ---

        // 1. Page Border
        doc.setDrawColor(33, 150, 243); // Primary Blue
        doc.setLineWidth(1);
        doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Outer border

        // 2. Header Background
        doc.setFillColor(33, 150, 243); // Primary Blue
        doc.rect(5, 5, pageWidth - 10, 35, 'F'); // Header block

        // 3. Header Text
        doc.setTextColor(255, 255, 255); // White
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("STUDENT REPORT CARD", pageWidth / 2, 25, { align: "center" });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Skill Conquest Academy", pageWidth / 2, 33, { align: "center" });

        // --- Student Details Section ---

        let yPos = 60;
        const leftColX = 20;
        const rightColX = 110;

        // Section Title
        doc.setTextColor(33, 150, 243); // Blue
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("STUDENT PROFILE", 20, yPos);

        // Divider Line
        doc.setDrawColor(200, 200, 200); // Light Gray
        doc.setLineWidth(0.5);
        doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);

        yPos += 15;

        // Details Content
        doc.setTextColor(60, 60, 60); // Dark Gray
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        const addDetail = (label, value, x, y) => {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, x, y);
            doc.setFont("helvetica", "normal");
            doc.text(value || 'N/A', x + 35, y);
        };

        addDetail("Name", selectedStudent.name, leftColX, yPos);
        addDetail("Grade", selectedStudent.grade, rightColX, yPos);

        yPos += 10;
        addDetail("Phone", selectedStudent.phoneNumber, leftColX, yPos);
        addDetail("Email", selectedStudent.email, rightColX, yPos);

        yPos += 10;
        addDetail("Date Joined", selectedStudent.date ? new Date(selectedStudent.date).toLocaleDateString() : 'N/A', leftColX, yPos);

        // Status Badge (Text representation)
        const status = (selectedStudent.marks !== null && selectedStudent.marks !== undefined)
            ? (selectedStudent.marks >= 40 ? "PASSED" : "FAILED")
            : "NOT ATTEMPTED";

        doc.setFont("helvetica", "bold");
        doc.text("Status:", rightColX, yPos);

        // Color code status
        if (status === "PASSED") doc.setTextColor(0, 128, 0); // Green
        else if (status === "FAILED") doc.setTextColor(255, 0, 0); // Red
        else doc.setTextColor(100, 100, 100); // Gray

        doc.text(status, rightColX + 35, yPos);

        // --- Performance Section ---

        yPos += 25;
        doc.setTextColor(33, 150, 243); // Blue
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("PERFORMANCE OVERVIEW", 20, yPos);
        doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);

        yPos += 15;

        // Marks Display
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        const marksText = (selectedStudent.marks !== null && selectedStudent.marks !== undefined)
            ? `Final Score: ${selectedStudent.marks}%`
            : "Final Score: Not Attempted";
        doc.text(marksText, 20, yPos);

        // Capture and add chart if available
        if (chartRef.current && selectedStudent.marks !== null && selectedStudent.marks !== undefined) {
            try {
                const canvas = await html2canvas(chartRef.current);
                const imgData = canvas.toDataURL('image/png');

                // Add chart image to PDF
                yPos += 10;
                const imgWidth = 100;
                const imgHeight = 80;
                const xCentered = (pageWidth - imgWidth) / 2;

                doc.addImage(imgData, 'PNG', xCentered, yPos, imgWidth, imgHeight);

                // Add border around chart
                doc.setDrawColor(230, 230, 230);
                doc.rect(xCentered - 5, yPos - 5, imgWidth + 10, imgHeight + 10);

            } catch (error) {
                console.error("Error capturing chart:", error);
            }
        }

        // --- Footer ---
        const footerY = pageHeight - 15;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, footerY);
        doc.text("Skill Conquest - Empowering Learners", pageWidth - 20, footerY, { align: "right" });

        // Save the PDF
        doc.save(`${selectedStudent.name.replace(/\s+/g, '_')}_Report.pdf`);
    };
    const getChartData = (student) => {
        if (!student || student.marks === null || student.marks === undefined) return [];
        return [
            { name: 'Score', value: student.marks },
            { name: 'Lost', value: 100 - student.marks }
        ];
    };

    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Student Details
            </Typography>

            {/* Filters */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Filter by Grade</InputLabel>
                            <Select
                                value={selectedGrade}
                                label="Filter by Grade"
                                onChange={(e) => setSelectedGrade(e.target.value)}
                            >
                                <MenuItem value="All">All Grades</MenuItem>
                                {uniqueGrades.map((grade) => (
                                    <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant="body2" color="text.secondary">
                            Minimum Score: {minScore}%
                        </Typography>
                        <Slider
                            value={minScore}
                            onChange={(e, newValue) => setMinScore(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={100}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" color="text.secondary" align="right">
                            Showing {filteredStudents.length} of {students.length} students
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)' }}>
                <Table sx={{ minWidth: 650 }} aria-label="student table">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Latest Marks</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                        {student.name}
                                    </TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell>{student.phoneNumber}</TableCell>
                                    <TableCell>{student.email || 'N/A'}</TableCell>
                                    <TableCell>
                                        {(student.marks !== null && student.marks !== undefined) ? `${student.marks}%` : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {student.date ? new Date(student.date).toLocaleDateString() : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {(student.marks !== null && student.marks !== undefined) ? (
                                            <Chip
                                                label={student.marks >= 40 ? "Passed" : "Failed"}
                                                color={student.marks >= 40 ? "success" : "error"}
                                                size="small"
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Chip label="Not Attempted" size="small" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton size="small" color="primary" onClick={() => handleView(student)}>
                                            <Eye size={20} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No student records found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Enhanced Student Details Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden'
                    }
                }}
            >
                <Box sx={{
                    background: 'linear-gradient(135deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'white', color: '#2196F3', width: 56, height: 56 }}>
                            <User size={32} />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight="bold">
                                {selectedStudent?.name}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                                Grade {selectedStudent?.grade} Student
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <X />
                    </IconButton>
                </Box>

                <DialogContent sx={{ p: 4, bgcolor: '#f8f9fa' }}>
                    {selectedStudent && (
                        <Grid container spacing={4}>
                            {/* Left Column: Personal Info */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%', border: '1px solid #e0e0e0' }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <User size={20} /> Personal Details
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />

                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Phone size={20} color="#666" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                                <Typography variant="body1" fontWeight="500">{selectedStudent.phoneNumber}</Typography>
                                            </Box>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Mail size={20} color="#666" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                                <Typography variant="body1" fontWeight="500">{selectedStudent.email || 'N/A'}</Typography>
                                            </Box>
                                        </Box>

                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Calendar size={20} color="#666" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Date Joined</Typography>
                                                <Typography variant="body1" fontWeight="500">
                                                    {selectedStudent.date ? new Date(selectedStudent.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Right Column: Performance */}
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={{ p: 3, borderRadius: 2, height: '100%', border: '1px solid #e0e0e0' }}>
                                    <Typography variant="h6" gutterBottom fontWeight="bold" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Award size={20} /> Performance Overview
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />

                                    {(selectedStudent.marks !== null && selectedStudent.marks !== undefined) ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Box ref={chartRef} sx={{ width: '100%', height: 200, position: 'relative', bgcolor: 'white' }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <PieChart>
                                                        <Pie
                                                            data={getChartData(selectedStudent)}
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={60}
                                                            outerRadius={80}
                                                            fill="#8884d8"
                                                            paddingAngle={5}
                                                            dataKey="value"
                                                        >
                                                            {getChartData(selectedStudent).map((entry, index) => (
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <RechartsTooltip />
                                                        <Legend verticalAlign="bottom" height={36} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -65%)',
                                                    textAlign: 'center'
                                                }}>
                                                    <Typography variant="h4" fontWeight="bold" color="text.primary">
                                                        {selectedStudent.marks}%
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Score
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: selectedStudent.marks >= 40 ? '#e8f5e9' : '#ffebee', p: 1, px: 2, borderRadius: 10 }}>
                                                {selectedStudent.marks >= 40 ? <CheckCircle size={18} color="green" /> : <XCircle size={18} color="red" />}
                                                <Typography variant="subtitle2" color={selectedStudent.marks >= 40 ? "success.main" : "error.main"} fontWeight="bold">
                                                    Result: {selectedStudent.marks >= 40 ? "PASSED" : "FAILED"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box sx={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'text.secondary', gap: 2 }}>
                                            <AlertCircle size={48} opacity={0.5} />
                                            <Typography>No performance data available</Typography>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                    <Button onClick={handleClose} color="inherit" sx={{ mr: 1 }}>Close</Button>
                    <Button
                        onClick={handleDownload}
                        variant="contained"
                        color="primary"
                        startIcon={<Download size={18} />}
                        sx={{
                            px: 3,
                            borderRadius: 2,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                        }}
                    >
                        Download Report
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StudentList;
