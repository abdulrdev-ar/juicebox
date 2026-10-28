import { cn } from "cn";
import Image from "next/image";

import { IconArrowUp } from "@/common/lib/asset";

interface TextInputProps extends React.ComponentProps<"input"> {
  id: string;
  error?: string;
  submitLabel: string;
  hasValue?: boolean;
}

export default function TextInput({
  id,
  error,
  submitLabel,
  hasValue,
  className,
  ...props
}: TextInputProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <div
        className={cn(
          "flex h-15 items-center gap-3 rounded-input border px-3 transition-colors duration-200",
          error
            ? "border-error"
            : "border-stroke focus-within:border-primary-light"
        )}
      >
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="min-w-0 flex-1 bg-transparent font-body text-body leading-[1.35] tracking-[0.32px] text-heading caret-primary-light outline-none placeholder:text-dim"
          {...props}
        />
        <button
          type="submit"
          aria-label={submitLabel}
          className={cn(
            "flex size-[31px] shrink-0 cursor-pointer items-center justify-center rounded-[27px] bg-medium transition-opacity duration-200",
            hasValue ? "opacity-100" : "opacity-50"
          )}
        >
          <Image src={IconArrowUp} alt="" width={18} height={18} />
        </button>
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 px-3 text-caption leading-[1.35] tracking-[0.24px] text-error"
        >
          {error}
        </p>
      )}
    </div>
  );
}
