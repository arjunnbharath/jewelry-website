import Image from "next/image";
import Link from "next/link";

const LOGO_ICON = "/logo/logo.jpg";
const LOGO_WORDMARK = "/logo/logo%20name.jpg";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
  showIcon?: boolean;
  light?: boolean;
  className?: string;
};

export function BrandLogo({
  href = "/",
  size = "md",
  showWordmark = true,
  showIcon = true,
  light = false,
  className = "",
}: BrandLogoProps) {
  const iconSize = size === "sm" ? 36 : 34;
  const wordmarkHeight = size === "sm" ? 32 : 30;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 ${light ? "brightness-0 invert" : ""} ${className}`}
    >
      {showIcon && (
        <Image
          src={LOGO_ICON}
          alt="House of Manivala"
          width={iconSize}
          height={iconSize}
          className="object-contain"
          style={{ height: iconSize, width: iconSize }}
          priority
        />
      )}
      {showWordmark && (
        <Image
          src={LOGO_WORDMARK}
          alt="House of Manivala"
          width={160}
          height={wordmarkHeight}
          className="object-contain"
          style={{ height: wordmarkHeight, width: "auto", maxWidth: 180 }}
          priority
        />
      )}
    </Link>
  );
}
