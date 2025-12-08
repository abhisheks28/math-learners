"use client"
import { Button } from "@/components/ui/button"

interface CalculatorKeypadProps {
  value: string
  onChange: (value: string) => void
  disabled: boolean
}

export function CalculatorKeypad({ value, onChange, disabled }: CalculatorKeypadProps) {
  const handleNumberClick = (num: string) => {
    if (!disabled) {
      onChange(value + num)
    }
  }

  const handleSymbol = (symbol: string) => {
    if (!disabled) {
      onChange(value + symbol)
    }
  }

  const handleBackspace = () => {
    if (!disabled) {
      onChange(value.slice(0, -1))
    }
  }

  const handleClear = () => {
    if (!disabled) {
      onChange("")
    }
  }

  return (
    <div className="w-full">
      {/* Row 1: - / Clear */}
      <div className="grid grid-cols-3 gap-0">
        <Button
          onClick={() => handleSymbol("-")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none first:rounded-tl-lg"
        >
          −
        </Button>
        <Button
          onClick={() => handleSymbol("/")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
        >
          /
        </Button>
        <Button
          onClick={handleClear}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none rounded-tr-lg"
        >
          Clear
        </Button>
      </div>

      {/* Row 2: 7 8 9 */}
      <div className="grid grid-cols-3 gap-0">
        {[7, 8, 9].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            disabled={disabled}
            className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Row 3: 4 5 6 */}
      <div className="grid grid-cols-3 gap-0">
        {[4, 5, 6].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            disabled={disabled}
            className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Row 4: 1 2 3 */}
      <div className="grid grid-cols-3 gap-0">
        {[1, 2, 3].map((num) => (
          <Button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            disabled={disabled}
            className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Row 5: . 0 Backspace */}
      <div className="grid grid-cols-3 gap-0">
        <Button
          onClick={() => handleSymbol(".")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
        >
          .
        </Button>
        <Button
          onClick={() => handleNumberClick("0")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
        >
          0
        </Button>
        <Button
          onClick={handleBackspace}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none"
        >
          ⌫
        </Button>
      </div>

      {/* Row 6: + × */}
      <div className="grid grid-cols-3 gap-0">
        <Button
          onClick={() => handleSymbol("+")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none rounded-bl-lg"
        >
          +
        </Button>
        <div className="h-12 bg-black" />
        <Button
          onClick={() => handleSymbol("×")}
          disabled={disabled}
          className="h-12 bg-black hover:bg-gray-800 text-white font-bold text-lg rounded-none rounded-br-lg"
        >
          ×
        </Button>
      </div>
    </div>
  )
}
