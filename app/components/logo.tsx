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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fileName = variant === 'cream'
        ? 'OIW25_Logo_Date_RGB_Cream.png'
        : 'OIW25_Logo_Date_RGB_BrightRed.png';

    const logoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/logos/${fileName}`;

    return (
        <div className={`relative ${className}`}>
            <Image
                src={logoUrl}
                alt="Oslo Innovation Week 2025"
                width={width}
                height={height}
                className={`
                    h-auto
                    transition-opacity duration-300
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                `}
                priority
                unoptimized
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setError("Failed to load logo");
                    setIsLoading(false);
                }}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center">
                    <div className="w-8 h-8 border-4 border-[#0071e1] border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </div>
    );
} 