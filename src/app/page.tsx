import { TimezoneCalculator } from "@/components/timezone-calculator";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 pt-16 pb-8 h-full">
      <h1 className="font-heading text-2xl font-semibold tracking-tight mb-6">
        Timezone Calculator
      </h1>
      <TimezoneCalculator />
    </div>
  );
}
