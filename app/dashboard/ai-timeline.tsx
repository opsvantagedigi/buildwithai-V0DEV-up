"use client";

import { useEffect, useState } from "react";
import { Check, Clock3, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Parsing intent",
    description: "Understanding your goals, audience, and constraints.",
  },
  {
    id: 2,
    title: "Drafting structure",
    description: "Outlining pages, sections, and primary user journeys.",
  },
  {
    id: 3,
    title: "Composing copy",
    description: "Generating on-brand headlines and supporting content.",
  },
  {
    id: 4,
    title: "Assembling layout",
    description: "Mapping content into responsive, production-ready blocks.",
  },
  {
    id: 5,
    title: "Preparing deployment",
    description: "Validating routes, metadata, and performance budgets.",
  },
];

export default function AiTimeline() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentStep((index) => (index + 1) % steps.length);
    }, 1600);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-3 text-xs font-sans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-500",
              isActive && "border-emerald-300/50 bg-white/10 shadow-[0_0_24px_rgba(16,185,129,0.35)]",
              !isActive && !isComplete && "opacity-40 blur-[1px]",
            )}
          >
            <div className="mt-0.5 flex items-center">
              {isComplete ? (
                <Check className="size-4 text-emerald-400" />
              ) : isActive ? (
                <Loader2 className="size-4 text-amber-300 animate-spin" />
              ) : (
                <Clock3 className="size-4 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-heading text-xs font-medium text-white/90">{step.title}</p>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                      <Sparkles className="size-3" />
                      <span>Live</span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground/70">
                  Step {index + 1} of {steps.length}
                </span>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
