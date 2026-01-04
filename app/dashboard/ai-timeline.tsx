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
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-3"
        >
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/60" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">{step.title}</p>
            <p className="text-xs text-muted-foreground">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
