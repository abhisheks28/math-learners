"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Timer } from "@/components/RapidMath/timer"
import { QuestionCard } from "@/components/RapidMath/question-card"
import { Card } from "@/components/ui/card"

interface Question {
  id: number
  question: string
  correctAnswer: number
  operation: string
  num1: number
  num2: number
}

interface TestResult {
  question: string
  correctAnswer: number
  userAnswer: number
  timeTaken: number
  isCorrect: boolean
  operation: string
  num1: number
  num2: number
  skipped: boolean
}

export default function TestPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const difficulty = (searchParams.get("difficulty") as any) || "easy"
  const totalQuestions = Number(searchParams.get("questions") || 10)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timerActive, setTimerActive] = useState(true)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [questionTimer, setQuestionTimer] = useState(0)

  const getRange = (diff: string) => {
    const ranges: any = {
      normal: { min: 1, max: 20 },
      easy: { min: 1, max: 50 },
      medium: { min: 10, max: 100 },
      hard: { min: 100, max: 500 },
    }
    return ranges[diff] || ranges.easy
  }

  const generateQuestion = useCallback((): Question => {
    const range = getRange(difficulty)
    const num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    const num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min
    const ops = ["+", "-", "*", "/"]
    const operation = ops[Math.floor(Math.random() * ops.length)]

    // For division, ensure we only generate proper divisions (no decimals)
    if (operation === "/") {
      const divisor = Math.floor(Math.random() * range.max) + 1
      const quotient = Math.floor(Math.random() * (range.max / 2)) + 1
      return {
        id: Date.now() + Math.random(),
        question: `${divisor * quotient} / ${divisor}`,
        correctAnswer: quotient,
        operation: "/",
        num1: divisor * quotient,
        num2: divisor,
      }
    }

    let correctAnswer = 0
    if (operation === "+") {
      correctAnswer = num1 + num2
    } else if (operation === "-") {
      correctAnswer = num1 - num2
    } else if (operation === "*") {
      correctAnswer = num1 * num2
    }

    return {
      id: Date.now() + Math.random(),
      question: `${num1} ${operation} ${num2}`,
      correctAnswer: correctAnswer,
      operation: operation,
      num1: num1,
      num2: num2,
    }
  }, [difficulty])

  useEffect(() => {
    const qs = Array.from({ length: totalQuestions }, () => generateQuestion())
    setQuestions(qs)
    setIsLoading(false)
    setQuestionStartTime(Date.now())
  }, [totalQuestions, generateQuestion])

  useEffect(() => {
    if (!timerActive) return

    const interval = setInterval(() => {
      setQuestionTimer(Math.floor((Date.now() - questionStartTime) / 1000))
    }, 100)

    return () => clearInterval(interval)
  }, [timerActive, questionStartTime])

  const currentQuestion = questions[currentQuestionIndex]

  const handleSubmitAnswer = useCallback(
    (userAnswer: number) => {
      if (!currentQuestion) return

      const timeTaken = Math.round((Date.now() - questionStartTime) / 1000)
      const isCorrect = userAnswer === currentQuestion.correctAnswer

      const result: TestResult = {
        question: currentQuestion.question,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: userAnswer,
        timeTaken: timeTaken,
        isCorrect: isCorrect,
        operation: currentQuestion.operation,
        num1: currentQuestion.num1,
        num2: currentQuestion.num2,
        skipped: false,
      }

      const newResults = [...results, result]
      setResults(newResults)

      moveToNextQuestion(newResults)
    },
    [currentQuestion, currentQuestionIndex, totalQuestions, questionStartTime],
  )

  const handleSkipQuestion = useCallback(() => {
    if (!currentQuestion) return

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000)

    const result: TestResult = {
      question: currentQuestion.question,
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer: 0,
      timeTaken: timeTaken,
      isCorrect: false,
      operation: currentQuestion.operation,
      num1: currentQuestion.num1,
      num2: currentQuestion.num2,
      skipped: true,
    }

    const newResults = [...results, result]
    setResults(newResults)

    moveToNextQuestion(newResults)
  }, [currentQuestion, currentQuestionIndex, totalQuestions, questionStartTime])

  const moveToNextQuestion = (newResults: TestResult[]) => {
    const nextIndex = currentQuestionIndex + 1
    if (nextIndex < totalQuestions) {
      setCurrentQuestionIndex(nextIndex)
      setQuestionStartTime(Date.now())
      setQuestionTimer(0)
    } else {
      setTimerActive(false)
      sessionStorage.setItem("testResults", JSON.stringify(newResults))
      router.push("/rapid-math/test/summary")
    }
  }

  useEffect(() => {
    const handleUnload = () => {
      if (results.length > 0) {
        sessionStorage.setItem("testResults", JSON.stringify(results))
      }
    }
    window.addEventListener("beforeunload", handleUnload)
    return () => window.removeEventListener("beforeunload", handleUnload)
  }, [results])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <Card className="p-8">
          <div className="text-center space-y-4">
            <div className="text-xl font-semibold">Loading...</div>
          </div>
        </Card>
      </main>
    )
  }

  const labels: any = { normal: "Normal", easy: "Easy", medium: "Medium", hard: "Hard" }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-2 overflow-hidden">
      <div className="max-w-sm mx-auto space-y-3 h-screen flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{labels[difficulty]}</h1>
          <Timer isActive={timerActive} />
        </div>

        {currentQuestion && (
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <QuestionCard
              question={currentQuestion}
              onSubmit={handleSubmitAnswer}
              onSkip={handleSkipQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              secondsElapsed={questionTimer}
            />
          </div>
        )}
      </div>
    </main>
  )
}
