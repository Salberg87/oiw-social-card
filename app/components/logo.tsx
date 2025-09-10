"use client";

import Image from "next/image";
import { useState } from "react";

interface LogoProps {
    variant?: 'bright-red' | 'cream';
    className?: string;
    width?: number;
    height?: number;
}

export function Logo({
    variant = 'bright-red',
    className = '',
    width = 400,
    height = 133
}: LogoProps) {
    const [error, setError] = useState<string | null>(null);

    const fileName = variant === 'cream'
        ? 'OIW25_Logo_Date_RGB_Cream.png'
        : 'OIW25_Logo_Date_RGB_BrightRed.png';

    const logoUrl = `/assets/logos/${fileName}`;

    return (
        <div className={`relative ${className}`}>
            <Image
                src={logoUrl}
                alt="Oslo Innovation Week 2025"
                width={width}
                height={height}
                className="h-auto"
                priority
                unoptimized
                onError={() => {
                    setError("Failed to load logo");
                }}
            />
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </div>
    );
} 