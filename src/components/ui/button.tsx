import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex h-15 w-full shrink-0 cursor-pointer items-center justify-center rounded-button font-body text-body leading-[1.35] tracking-[0.32px] whitespace-nowrap transition-[opacity,transform,background-color] duration-200 ease-out select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-light text-heading-dark hover:opacity-90",
        outline: "border border-stroke text-heading hover:bg-glass",
        light:
          "bg-action text-heading-dark shadow-[0_0_0_8px_var(--background-button)] hover:opacity-90",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
