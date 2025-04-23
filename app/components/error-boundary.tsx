'use client';

import { useEffect, useState } from 'react';
import { logger } from '../utils/logger';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            logger.error('Unhandled error caught by ErrorBoundary:', error);
            setError(error.error);
            setHasError(true);
        };

        window.addEventListener('error', handleError);

        return () => {
            window.removeEventListener('error', handleError);
        };
    }, []);

    if (hasError) {
        return (
            <div className="min-h-screen bg-[#f7ebda] flex items-center justify-center p-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-[#0071e1]/10 max-w-xl mx-auto text-center">
                    <h1 className="text-[#000037] text-2xl sm:text-3xl font-semibold mb-4">
                        Something went wrong
                    </h1>
                    <p className="text-[#000037]/80 mb-6">
                        We apologize for the inconvenience. The application has encountered an unexpected error.
                    </p>
                    <div className="mb-6 p-4 bg-gray-100 rounded-md text-left overflow-auto max-h-32">
                        <code className="text-sm text-gray-800 whitespace-pre-wrap">
                            {error?.message || 'Unknown error'}
                        </code>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#000037] text-white px-6 py-3 rounded-md hover:bg-[#000037]/90 transition-all"
                    >
                        Reload the application
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
} 