import { cn } from "cn";

interface ScreenProps {
  glow?: "top" | "center";
  children: React.ReactNode;
}

export default function Screen({ glow = "top", children }: ScreenProps) {
  return (
    <div
      className={cn(
        "min-h-dvh overflow-x-clip",
        glow === "top" ? "bg-glow-top" : "bg-glow-center"
      )}
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-(--page-max) flex-col">
        {children}
      </div>
    </div>
  );
}
