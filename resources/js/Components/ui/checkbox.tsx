import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckboxProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
        "onCheckedChange"
    > {
    onCheckedChange?: (event: { target: { checked: boolean } }) => void;
}

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleCheckedChange = (checked: CheckboxPrimitive.CheckedState) => {
        if (typeof onCheckedChange === "function") {
            onCheckedChange({
                target: {
                    checked: checked === true, // Konversi Radix State ke boolean
                },
            });
        }
    };

    return (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                className
            )}
            checked={checked}
            onCheckedChange={handleCheckedChange}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn("flex items-center justify-center text-current")}
            >
                <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
