export const SITE_NAME = "DOCKHUB";

export const PUBLIC_NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Showcase", href: "/showcase" },
  { label: "Spaces", href: "/spaces" },
  { label: "Pricing", href: "/pricing" },
  { label: "Passes", href: "/passes" },
] as const;

export const ADMIN_NAVIGATION = [
  { label: "Dashboard", href: "/admin" },
  { label: "Rooms", href: "/admin/rooms" },
  { label: "Pricing", href: "/admin/pricing" },
  { label: "Pass Plans", href: "/admin/passes" },
] as const;

export const FALLBACK_ROOM_IMAGE = "/images/rooms/reception-placeholder.jpg";
