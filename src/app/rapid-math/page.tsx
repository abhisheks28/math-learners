"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>("normal")
  const [questionCount, setQuestionCount] = useState(10)

  const handleStartTest = () => {
    if (!selectedDifficulty) return
    router.push(`/rapid-math/test?difficulty=${selectedDifficulty}&questions=${questionCount}`)
  }

  const difficultyInfo: any = {
    normal: { label: "Normal", description: "Easy & Medium mix", color: "bg-blue-500" },
    easy: { label: "Easy", description: "1-2 digit numbers", color: "bg-green-500" },
    medium: { label: "Medium", description: "2-3 digit numbers", color: "bg-yellow-500" },
    hard: { label: "Hard", description: "3-4 digit numbers", color: "bg-red-500" },
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Math Quiz Master</CardTitle>
          <CardDescription>Test your arithmetic skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Select Difficulty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(difficultyInfo).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${selectedDifficulty === level
                      ? `${difficultyInfo[level].color} text-white border-transparent`
                      : "border-border hover:border-primary"
                    }`}
                >
                  <div className="font-semibold">{difficultyInfo[level].label}</div>
                  <div className="text-xs">{difficultyInfo[level].description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Number of Questions</h2>
            <div className="flex items-center justify-between gap-4">
              <input
                type="range"
                min="1"
                max="50"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-2xl font-bold text-primary min-w-12 text-right">{questionCount}</div>
            </div>
          </div>

          <Button onClick={handleStartTest} disabled={!selectedDifficulty} size="lg" className="w-full">
            Start Test
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
