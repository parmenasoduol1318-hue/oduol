# UI Components

The `ui` folder contains reusable, presentation-focused components used throughout the SwiftReply application. These components provide a consistent look and feel while reducing duplicated code.

---

# Folder Structure

```text
frontend/components/ui
│
├── AlertBanner.tsx
├── Badge.tsx
├── BottomSheet.tsx
├── Divider.tsx
├── EmptyState.tsx
├── ErrorView.tsx
├── FloatingActionButton.tsx
├── LoadingOverlay.tsx
├── ProgressBar.tsx
├── README.md
├── SectionTitle.tsx
├── Skeleton.tsx
├── StatusChip.tsx
└── Tooltip.tsx
```

---

# Components

## AlertBanner

Displays important messages.

Supported types:

- Success
- Error
- Warning
- Info

Example uses:

- Login success
- Payment failed
- Subscription expired
- Internet disconnected

---

## Badge

Small label used for status.

Examples:

- PRO
- FREE
- NEW
- BETA
- PREMIUM
- VERIFIED

---

## BottomSheet

Reusable slide-up modal.

Typical uses:

- Chat actions
- Image actions
- Share options
- Delete confirmation
- Profile options

---

## Divider

Simple horizontal or vertical separator.

Used between:

- List items
- Cards
- Settings
- Menu sections

---

## EmptyState

Shown when there is no content.

Examples:

- No chats
- No images
- No memories
- No search results

---

## ErrorView

Displays friendly error screens.

Examples:

- Network error
- Server unavailable
- Authentication failed
- Unknown error

---

## FloatingActionButton

Floating circular action button.

Examples:

- New Chat
- Generate Image
- Voice Chat
- Add Memory

---

## LoadingOverlay

Displays a full-screen loading indicator while preventing user interaction.

Examples:

- Login
- Payment processing
- AI response loading
- Image generation

---

## ProgressBar

Visual progress indicator.

Examples:

- File upload
- Image generation
- Voice transcription
- Subscription usage
- Download progress

---

## SectionTitle

Reusable section heading.

Examples:

- Recent Chats
- Settings
- Memories
- Subscription
- Images

---

## Skeleton

Placeholder loading component displayed while content is loading.

Examples:

- Chat history loading
- Profile loading
- Settings loading
- Image gallery loading

---

## StatusChip

Compact status indicator.

Examples:

- Online
- Offline
- Active
- Pending
- Completed
- Failed

---

## Tooltip

Small contextual popup shown to explain buttons or features.

Examples:

- Button descriptions
- Help messages
- Keyboard shortcuts
- Feature hints

---

# Design Principles

All UI components should be:

- Reusable
- Lightweight
- Responsive
- Accessible
- Theme-aware
- Easy to customize

---

# Dependencies

Most components depend on:

- React
- React Native
- `@expo/vector-icons`

Shared project resources:

- `constants/colors`
- `components/common`
- `components/settings`

---

# Future Enhancements

Planned additions include:

- Toast notifications
- Snackbar
- Avatar component
- Timeline
- Stepper
- Rating component
- Tabs
- Accordion
- Carousel
- Timeline cards
- Speed dial menu
- Context menu
- Confetti animation
- Glassmorphism cards
- Blur overlay
- Animated placeholders
- Pull-to-refresh indicator

---

# SwiftReply UI Goals

The UI component library is designed to provide a modern, consistent, and scalable foundation for every screen in SwiftReply. Every reusable visual element should live here whenever possible, making future maintenance and feature development faster and more consistent across the app.