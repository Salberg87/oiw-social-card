export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f7ebda] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-light text-[#005338] mb-4">404 - Page Not Found</h1>
                <p className="text-[#005338]/80">Sorry, the page you are looking for does not exist.</p>
                <a href="/" className="text-[#0071e1] hover:underline mt-4 inline-block">
                    Return to Home
                </a>
            </div>
        </div>
    );
} 