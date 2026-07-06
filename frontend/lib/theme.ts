// frontend/lib/theme.ts

/* ======================================================
   Colors
====================================================== */

export const Colors = {
  light: {
    primary: "#2563EB",
    secondary: "#7C3AED",
    success: "#16A34A",
    warning: "#F59E0B",
    error: "#DC2626",

    background: "#FFFFFF",
    surface: "#F8FAFC",
    card: "#FFFFFF",

    text: "#111827",
    textSecondary: "#6B7280",

    border: "#E5E7EB",
    divider: "#E5E7EB",

    input: "#F3F4F6",

    disabled: "#9CA3AF",

    overlay: "rgba(0,0,0,0.4)",
  },

  dark: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    success: "#22C55E",
    warning: "#FBBF24",
    error: "#EF4444",

    background: "#0F172A",
    surface: "#1E293B",
    card: "#1F2937",

    text: "#F9FAFB",
    textSecondary: "#CBD5E1",

    border: "#334155",
    divider: "#334155",

    input: "#334155",

    disabled: "#64748B",

    overlay: "rgba(0,0,0,0.7)",
  },
} as const;

/* ======================================================
   Typography
====================================================== */

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
  display: 36,
} as const;

export const FontWeights = {
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/* ======================================================
   Spacing
====================================================== */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

/* ======================================================
   Border Radius
====================================================== */

export const Radius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  pill: 999,
} as const;

/* ======================================================
   Shadows
====================================================== */

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
  },

  md: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },

  lg: {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
  },
} as const;

/* ======================================================
   Layout
====================================================== */

export const Layout = {
  headerHeight: 60,

  bottomBarHeight: 70,

  sidebarWidth: 300,

  maxContentWidth: 900,
} as const;

/* ======================================================
   Animation
====================================================== */

export const Animation = {
  fast: 150,

  normal: 250,

  slow: 400,
} as const;

/* ======================================================
   Z Index
====================================================== */

export const ZIndex = {
  dropdown: 100,

  modal: 500,

  toast: 900,

  loading: 999,

  tooltip: 1000,
} as const;

/* ======================================================
   Theme Export
====================================================== */

const Theme = {
  Colors,
  FontSizes,
  FontWeights,
  Spacing,
  Radius,
  Shadows,
  Layout,
  Animation,
  ZIndex,
};

export default Theme;