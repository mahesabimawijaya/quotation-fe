import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  sent: { bg: "bg-[#219653]/[0.08]", text: "text-[#219653]" },
  pending: { bg: "bg-[#FFA70B]/[0.08]", text: "text-[#FFA70B]" },
  failed: { bg: "bg-[#D34053]/[0.08]", text: "text-[#D34053]" },
};

export const Badge = ({ children }: BadgeProps) => {
  const key = String(children).toLowerCase();
  const styles = colorMap[key] || {
    bg: "bg-gray-200",
    text: "text-gray-700",
  };

  return (
    <div
      className={cn(
        "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
        styles.bg,
        styles.text,
      )}
    >
      {children}
    </div>
  );
};
