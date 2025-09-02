import { cn } from "@/lib/utils";
import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          {leftIcon && (
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {rightIcon && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400">
              {rightIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "w-full rounded-lg bg-gray-100 px-2 py-3.5 outline-none",
              leftIcon && "pl-11",
              error && "border-red-500",
              className,
            )}
            {...props}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
