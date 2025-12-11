import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function TaskCelebration({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-[9999]">
      <DotLottieReact
        src="https://lottie.host/7c8d20b9-7855-49d2-a43c-935300f7a5c4/6LLJztI6gn.lottie"
        autoplay
        loop={false}
      />
    </div>
  );
}
