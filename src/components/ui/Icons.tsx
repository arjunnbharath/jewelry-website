export function DiamondIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2L2 9l10 13L22 9 12 2zm0 3.2L18.5 9 12 17.3 5.5 9 12 5.2z" />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 20.5l-1.1-1C5.5 14.8 2 11.6 2 7.9 2 5.1 4.1 3 6.9 3c1.6 0 3.1.8 4.1 2 1-1.2 2.5-2 4.1-2 2.8 0 5 2.3 5 5.1 0 3.7-3.5 6.9-8.9 11.6L12 20.5z" />
    </svg>
  );
}

export function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 3h2l2.2 11.3a2 2 0 002 1.7h7.6a2 2 0 002-1.7L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TruckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 7h11v8H3V7zM14 10h3l3 3v2h-6v-5z" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

export function ShieldIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AwardIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 14L7 21l5-2.5L17 21l-1.5-7" strokeLinejoin="round" />
    </svg>
  );
}

export function GiftIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="10" width="18" height="11" rx="1" />
      <path d="M12 10V21M3 10h18V7a2 2 0 00-2-2H5a2 2 0 00-2 2v3zM12 5v5M8.5 5C7.1 5 6 3.9 6 2.5S7.1 0 8.5 0 11 1.1 11 2.5 9.9 5 8.5 5zM15.5 5C16.9 5 18 3.9 18 2.5S16.9 0 15.5 0 13 1.1 13 2.5 14.1 5 15.5 5z" />
    </svg>
  );
}

export function HeadsetIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 14v-2a8 8 0 0116 0v2" />
      <rect x="2" y="14" width="5" height="6" rx="2" />
      <rect x="17" y="14" width="5" height="6" rx="2" />
    </svg>
  );
}

export function StarIcon({ className = "h-3.5 w-3.5", filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M10 1.5l2.4 5.5 6 .5-4.5 4 1.4 6-5.3-3.2L5 17.5l1.4-6-4.5-4 6-.5L10 1.5z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
