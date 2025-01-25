import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

// Tambahkan tipe untuk props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean; // Properti opsional untuk menentukan fokus awal
}

// Komponen dengan forwardRef
const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", className = "", isFocused = false, ...props }, ref) => {
        const localRef = useRef<HTMLInputElement>(null); // Referensi lokal ke elemen input

        // Gunakan useImperativeHandle untuk menggabungkan ref kustom dengan properti HTMLInputElement
        useImperativeHandle(ref, () => ({
            ...(localRef.current as HTMLInputElement), // Gabungkan properti bawaan HTMLInputElement
            focus: () => localRef.current?.focus(), // Tambahkan metode fokus kustom
        }));

        // Fokus otomatis saat `isFocused` diatur ke true
        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props} // Spread properti lainnya ke elemen input
                type={type} // Tipe input (default: text)
                className={cn(
                    "flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:my-2 file:items-center file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    className // Gabungkan kelas tambahan dari props
                )}
                ref={localRef} // Referensi lokal
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
