"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function RegenerateButton() {
    const [isSpinning, setIsSpinning] = useState(false);

    const handleRegenerate = () => {
        setIsSpinning(true);
        window.location.reload();
    };

    return (
        <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 mx-auto mt-4"
        >
            <RefreshCw size={20} className={isSpinning ? "animate-spin" : ""} />
            Generate New Plan
        </button>
    );
}
