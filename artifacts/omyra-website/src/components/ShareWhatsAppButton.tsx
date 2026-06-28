import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface ShareWhatsAppButtonProps {
  title: string;
  subtitle?: string;
  variant?: "icon" | "pill" | "full";
  className?: string;
}

export function ShareWhatsAppButton({
  title,
  subtitle,
  variant = "pill",
  className = "",
}: ShareWhatsAppButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const message =
    subtitle
      ? `✨ Check out *${title}* costumes at Omyra Fancy Dress & School Uniforms!\n\n📎 ${shareUrl}`
      : `✨ Check out *${title}* at Omyra Fancy Dress & School Uniforms!\n\n📎 ${shareUrl}`;

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title, url: shareUrl }).catch(() => {
        window.open(waShareUrl, "_blank", "noopener,noreferrer");
      });
    } else {
      window.open(waShareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — just open WhatsApp share
      window.open(waShareUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleShare(); }}
        title="Share on WhatsApp"
        className={`w-8 h-8 rounded-full bg-white/90 dark:bg-[#0F0C1E]/90 backdrop-blur-sm shadow flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200 ${className}`}
      >
        <SiWhatsapp className="w-3.5 h-3.5" />
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/50 dark:border-[#25D366]/40 text-[#25D366] font-sans text-sm font-medium hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-200"
        >
          <SiWhatsapp className="w-4 h-4" />
          Share on WhatsApp
        </button>
        <button
          onClick={handleCopy}
          title="Copy link"
          className="w-9 h-9 rounded-full border border-[#E5E7EB] dark:border-[#23203A] flex items-center justify-center text-[#6B7280] dark:text-[#8B8499] hover:border-[#E8177A] hover:text-[#E8177A] transition-all duration-200"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  // full variant
  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <button
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-2 flex-1 py-3 px-5 rounded-xl border-2 border-[#25D366] text-[#25D366] font-sans font-semibold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-200"
      >
        <SiWhatsapp className="w-4 h-4" />
        Share via WhatsApp
      </button>
      <button
        onClick={handleCopy}
        title={copied ? "Link copied!" : "Copy link"}
        className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-[#E5E7EB] dark:border-[#23203A] text-[#6B7280] dark:text-[#8B8499] font-sans font-semibold text-sm hover:border-[#E8177A] hover:text-[#E8177A] transition-all duration-200"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-500">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
