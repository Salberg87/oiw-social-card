import { Logo } from "./components/logo";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f7ebda] flex items-center justify-center">
            <Link href="https://www.oiw.no" className="text-center">
                <Logo variant="bright-red" width={200} height={67} />
                <h1 className="text-4xl font-light text-[#000037] mb-4">404 - Page Not Found</h1>
                <p className="text-[#000037]/80">Sorry, looks like you're lost.</p>
            </Link>
        </div>
    );
} 