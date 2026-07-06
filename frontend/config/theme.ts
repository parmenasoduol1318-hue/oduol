// frontend/config/theme.ts

import { DefaultTheme } from "@react-navigation/native";

export const Colors = {
  primary: "#2563EB",
  secondary: "#7C3AED",

  background: "#F8FAFC",
  surface: "#FFFFFF",

  text: "#111827",
  textSecondary: "#6B7280",

  border: "#E5E7EB",

  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  userBubble: "#2563EB",
  aiBubble: "#FFFFFF",

  userText: "#FFFFFF",
  aiText: "#111827",

  inputBackground: "#FFFFFF",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  round: 999,
};

export const Typography = {
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700" as const,
  },

  subheading: {
    fontSize: 18,
    fontWeight: "600" as const,
  },

  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },

  caption: {
    fontSize: 13,
    fontWeight: "400" as const,
  },

  button: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
};

export const Shadows = {
  card: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
};

export const AppTheme = {
  colors: Colors,
  spacing: Spacing,
  radius: Radius,
  typography: Typography,
  shadows: Shadows,
};

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.text,
    border: Colors.border,
    notification: Colors.error,
  },
};

export default AppTheme;