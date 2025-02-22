import React from "react";

interface LogoProps {
    className?: string; // Opsional, untuk mendukung custom class
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 300"
            className={className}
        >
            <defs>
                <style>{`.cls-1{fill:#1c6e8c;}.cls-2{fill:#274156;}`}</style>
            </defs>
            <title>Logo</title>
            <polygon
                className="cls-1"
                points="161.58 60.58 141.07 96.13 113.54 143.86 86.01 96.13 85.79 95.75 106.08 60.58 161.58 60.58"
            />
            <polygon
                className="cls-2"
                points="168.61 239.3 112.88 239.3 85.68 192.15 86.19 191.25 140.89 191.25 140.93 191.32 168.61 239.3"
            />
            <polygon
                className="cls-2"
                points="113.54 143.86 113.36 144.17 57.99 144.17 57.93 144.05 30.28 96.13 86.01 96.13 113.54 143.86"
            />
            <polygon
                className="cls-1"
                points="270.37 60.58 250.34 96.13 223.26 144.17 196.73 191.25 169.66 239.3 168.61 239.3 140.93 191.32 140.96 191.25 168.13 144.17 195.84 96.13 216.35 60.58 270.37 60.58"
            />
        </svg>
    );
};

export default Logo;
