import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Button, IconButton, Typography, Box } from '@mui/material';
import { Grid, X } from 'lucide-react';
import Styles from './QuestionPalette.module.css';

const QuestionPalette = ({ questions, activeQuestionIndex, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const gridRef = useRef(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    const PaletteContent = ({ onClose }) => (
        <>
            <div className={Styles.drawerHeader}>
                <Typography variant="h6" fontWeight="bold">Question Palette</Typography>
                {onClose && (
                    <IconButton onClick={onClose}>
                        <X size={24} />
                    </IconButton>
                )}
            </div>

            <div className={Styles.gridContainer} ref={gridRef}>
                {questions.map((q, index) => {
                    // Validation Logic
                    const isQuestionAnswered = (question) => {
                        if (!question.userAnswer) return false;
                        if (question.type === 'mcq' || question.type === 'userInput' || question.type === 'trueAndFalse') {
                            // Basic check: non-empty string
                            return typeof question.userAnswer === 'string' && question.userAnswer.trim() !== "";
                        }
                        if (question.type === 'tableInput') {
                            try {
                                const ans = typeof question.userAnswer === 'string' ? JSON.parse(question.userAnswer) : question.userAnswer;
                                const rows = question.rows || [];
                                // Ensure EVERY row has a valid answer
                                return rows.every((row, idx) => {
                                    const rowAns = ans[idx];
                                    if (!rowAns) return false;

                                    // Check based on variant or inputType
                                    // If inputType is radio or select, rowAns is value string?
                                    // Actually TypeTableInput stores {value: ...} for default
                                    // For fraction: {num: ..., den: ...}
                                    // For coordinate: {x: ..., y: ...}

                                    const variant = question.variant || 'default';

                                    if (variant === 'fraction') {
                                        return rowAns.num && rowAns.num.trim() !== "" && rowAns.den && rowAns.den.trim() !== "";
                                    }
                                    if (variant === 'coordinate') {
                                        return rowAns.x && rowAns.x.trim() !== "" && rowAns.y && rowAns.y.trim() !== "";
                                    }
                                    // Default (text, radio, select)
                                    // It stores object {value: "..."} usually, or just value?
                                    // Looking at TypeTableInput: 
                                    // handleInputChange(idx, 'value', val) -> answers[idx] = {value: val} (except fraction/coord)
                                    // So we check rowAns.value

                                    // Wait, TypeTableInput initializes as object. 
                                    // `newRowAnswer = value` ? No.
                                    // Line 44: `newRowAnswer = { ...currentAnswer, [field]: value };` (fraction/coord)
                                    // Line 46: `newRowAnswer = value;` (others? WAIT)
                                    // Let's re-read TypeTableInput line 46 from previous `view_file` (Step 68).
                                    // Line 44: if variant fraction/coord: object update.
                                    // Line 46: else: `newRowAnswer = value;` -> So it's a direct string?
                                    // But handleInputChange calls: `handleInputChange(idx, 'value', e.target.value)`
                                    // If it falls to line 46, `value` is the string. So `answers[idx]` becomes string.
                                    // BUT line 39: `const currentAnswer = answers[idx] || {};` 
                                    // If answers[idx] is string, currentAnswer is string.
                                    // If we update strict string, it works.

                                    // HOWEVER, let's look at `handleInputChange` usage in `renderInputCell`:
                                    // Radio: `onChange={(e) => handleInputChange(idx, 'value', e.target.value)}`
                                    // Since variant is likely default, it goes to line 46?
                                    // Line 42: `if (variant === 'fraction' || variant === 'coordinate')`
                                    // So for default, it executes `newRowAnswer = value`.
                                    // So `answers[idx]` is the raw value (string).

                                    // Exception: What if it WAS an object previously? 
                                    // TypeTableInput state `answers` is initialized from `userAnswer` (JSON).
                                    // If `userAnswer` was `{0: "val"}`, then it works.

                                    // So for default: check if rowAns is non-empty string.
                                    if (typeof rowAns === 'string') {
                                        return rowAns.trim() !== "";
                                    }
                                    // Fallback if it resembles object with value property (in case of future changes)
                                    if (rowAns && typeof rowAns === 'object' && rowAns.value) {
                                        return rowAns.value.trim() !== "";
                                    }
                                    return false;
                                });
                            } catch (e) {
                                return false;
                            }
                        }
                        return false;
                    };

                    const isCompleted = isQuestionAnswered(q);
                    const isActive = index === activeQuestionIndex;
                    const isMarkedForReview = q.markedForReview || false;

                    let className = Styles.gridItem;
                    if (isMarkedForReview) {
                        className += ` ${Styles.markedForReview}`;
                    } else if (isCompleted) {
                        className += ` ${Styles.completed}`;
                    }
                    if (isActive) {
                        className += ` ${Styles.active}`;
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            data-index={index}
                            onClick={() => {
                                onSelect(index);
                                if (onClose) onClose();
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div className={Styles.legend}>
                <div className={Styles.legendItem}>
                    <span className={`${Styles.dot} ${Styles.completed}`}></span>
                    <span>Answered</span>
                </div>
                {/* <div className={Styles.legendItem}>
                    <span className={`${Styles.dot} ${Styles.markedForReview}`}></span>
                    <span>Marked for Review</span>
                </div> */}
                <div className={Styles.legendItem}>
                    <span className={`${Styles.dot} ${Styles.active}`}></span>
                    <span>Current</span>
                </div>
                <div className={Styles.legendItem}>
                    <span className={Styles.dot}></span>
                    <span>Not Answered</span>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        if (!gridRef.current) return;
        const button = gridRef.current.querySelector(`[data-index="${activeQuestionIndex}"]`);
        if (button && typeof button.scrollIntoView === 'function') {
            button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    }, [activeQuestionIndex]);

    return (
        <>
            {/* Desktop View: Expanded Palette */}
            <div className={Styles.desktopPalette}>
                <PaletteContent />
            </div>

            {/* Mobile View: Button + Drawer */}
            <div className={Styles.mobilePalette}>
                <Button
                    variant="contained"
                    startIcon={<Grid size={20} />}
                    onClick={toggleDrawer(true)}
                    className={Styles.paletteButton}
                    sx={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        borderColor: 'transparent',
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 2.5,
                        py: 0.75,
                        '&:hover': {
                            backgroundColor: '#1d4ed8',
                        }
                    }}
                >
                    Questions
                </Button>

                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: { width: 320, maxWidth: '80vw' }
                    }}
                >
                    <PaletteContent onClose={toggleDrawer(false)} />
                </Drawer>
            </div>
        </>
    );
};

export default QuestionPalette;
