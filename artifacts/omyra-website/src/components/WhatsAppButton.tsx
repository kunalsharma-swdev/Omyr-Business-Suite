import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  text?: string;
  message?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function WhatsAppButton({ 
  text = "Contact on WhatsApp", 
  message = "", 
  className = "",
  variant = "default",
  size = "default"
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = `https://wa.me/918197547412${message ? `?text=${encodeURIComponent(message)}` : ""}`;
    window.open(url, "_blank");
  };

  const isDefaultVariant = variant === "default";

  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleClick} 
      className={`${isDefaultVariant ? "bg-[#25D366] hover:bg-[#128C7E] text-white" : ""} ${className}`}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {text}
    </Button>
  );
}
