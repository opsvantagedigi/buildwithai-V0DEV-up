"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  "Interpreting intent",
  "Planning structure",
  "Designing brand & layout",
  "Selecting domain",
  "Deploying website",
]

export function AiTimeline() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev))
    }, 1500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-md w-full mx-auto mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-4 transition-all duration-500",
                !isActive && !isCompleted ? "opacity-30 blur-[1px]" : "opacity-100 blur-0",
              )}
            >
              <div
                className={cn(
                  "size-6 rounded-full flex items-center justify-center border transition-all duration-500",
                  isCompleted ? "bg-white border-white" : "border-white/20",
                )}
              >
                {isCompleted ? (
                  <Check className="size-3.5 text-black" />
                ) : isActive ? (
                  <Loader2 className="size-3.5 animate-spin text-white" />
                ) : null}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-500",
                  isActive ? "text-white" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
