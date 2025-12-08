"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalculatorKeypad } from "./calculator-keypad"

interface QuestionData {
  id: number
  question: string
  correctAnswer: number
  operation: string
  num1: number
  num2: number
}

interface QuestionCardProps {
  question: QuestionData
  onSubmit: (userAnswer: number) => void
  onSkip: () => void
  questionNumber: number
  totalQuestions: number
  secondsElapsed: number
}

export function QuestionCard({
  question,
  onSubmit,
  onSkip,
  questionNumber,
  totalQuestions,
  secondsElapsed,
}: QuestionCardProps) {
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const showSkipButton = secondsElapsed >= 30

  useEffect(() => {
    setUserAnswer("")
    setFeedback(null)
    setSubmitted(false)
  }, [question.id])

  useEffect(() => {
    if (userAnswer && !submitted) {
      const answer = Number(userAnswer)
      if (!isNaN(answer) && answer === question.correctAnswer) {
        setFeedback("correct")
        setSubmitted(true)
        setTimeout(() => {
          onSubmit(answer)
        }, 500)
      }
    }
  }, [userAnswer, question.correctAnswer, submitted, onSubmit])

  const handleAnswerChange = (value: string) => {
    const answer = Number(value)
    if (value && !isNaN(answer) && answer !== question.correctAnswer) {
      setFeedback("incorrect")
      setUserAnswer(value)
      setTimeout(() => {
        setUserAnswer("")
        setFeedback(null)
      }, 5000)
    } else {
      setUserAnswer(value)
      if (!value) {
        setFeedback(null)
      }
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto h-fit">
      <CardHeader className="py-2 px-3">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="text-base">
            Q{questionNumber}/{totalQuestions}
          </CardTitle>
          <div className="text-xs text-muted-foreground">Time: {secondsElapsed}s</div>
          <div className="text-xs text-muted-foreground">{Math.round((questionNumber / totalQuestions) * 100)}%</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-3 pb-3">
        <div className="bg-secondary p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">
            {question.num1} {question.operation} {question.num2}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-0.5">Answer</label>
          <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg text-center">
            <div className="text-xl font-bold text-primary min-h-6">{userAnswer || "_"}</div>
          </div>
        </div>

        <div className="scale-95 origin-top">
          <CalculatorKeypad value={userAnswer} onChange={handleAnswerChange} disabled={submitted} />
        </div>

        {feedback && (
          <div
            className={`p-2 rounded-lg text-center text-xs font-semibold ${
              feedback === "correct"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {feedback === "correct" ? "✓ Correct!" : "✗ Wrong, clearing in 5s..."}
          </div>
        )}

        {showSkipButton && !submitted && (
          <Button onClick={onSkip} variant="outline" size="sm" className="w-full text-xs bg-transparent">
            Skip
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
