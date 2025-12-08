"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TestResult {
  question: string
  correctAnswer: number
  userAnswer: number
  timeTaken: number
  isCorrect: boolean
  operation: string
  num1: number
  num2: number
}

export default function SummaryPage() {
  const router = useRouter()
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = sessionStorage.getItem("testResults")
    if (stored) {
      try {
        setResults(JSON.parse(stored))
      } catch (e) {
        console.error("Parse error:", e)
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <Card className="p-8">
          <div className="text-center text-xl font-semibold">Loading...</div>
        </Card>
      </main>
    )
  }

  const correct = results.filter((r) => r.isCorrect).length
  const total = results.length
  const totalTime = results.reduce((sum, r) => sum + r.timeTaken, 0)
  const avgTime = total > 0 ? (totalTime / total).toFixed(1) : "0"

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Complete!</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300">{correct}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Correct</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-700 dark:text-red-300">{total - correct}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Wrong</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {totalTime >= 60
                  ? `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`
                  : `${totalTime}s`}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Total Time</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">{avgTime}s</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Avg Time</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${result.isCorrect
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
                    }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Q {idx + 1}</div>
                      <div className="text-lg font-semibold">{result.question}</div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">Correct: </span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{result.correctAnswer}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Your: </span>
                        <span
                          className={`font-semibold ${result.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            }`}
                        >
                          {result.userAnswer}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time: </span>
                        <span className="font-semibold">{result.timeTaken}s</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/")} variant="outline" size="lg">
            Home
          </Button>
          <Button
            onClick={() => {
              sessionStorage.removeItem("testResults")
              router.push("/rapid-math")
            }}
            size="lg"
          >
            New Test
          </Button>
        </div>
      </div>
    </main>
  )
}
