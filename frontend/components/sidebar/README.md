# Sidebar Components

The `sidebar` folder contains reusable components for the **SwiftReply navigation drawer and chat history**.

These components power the ChatGPT-style sidebar used for navigating conversations, starting new chats, managing history, and accessing account features.

---

# Folder Structure

```text
frontend/components/sidebar
│
├── ChatHistory.tsx
├── HistoryItem.tsx
├── NewChatButton.tsx
├── SearchChats.tsx
├── Sidebar.tsx
├── SidebarFooter.tsx
├── SidebarHeader.tsx
├── SidebarMenu.tsx
├── UserProfileCard.tsx
└── README.md
```

---

# Components

## Sidebar.tsx

Main sidebar container.

Responsibilities:

- Layout
- Navigation
- Chat history
- Search
- User profile
- Footer

---

## SidebarHeader.tsx

Displays:

- SwiftReply logo
- App name
- Collapse/close button

---

## SearchChats.tsx

Search conversations.

Features:

- Live search
- Clear button
- Search icon
- Debounced input

---

## NewChatButton.tsx

Creates a brand-new conversation.

Features:

- Loading state
- Disabled state
- Plus icon

---

## ChatHistory.tsx

Displays all conversations.

Supports:

- Scrollable list
- Empty state
- Selected chat
- Rename
- Delete

---

## HistoryItem.tsx

Individual chat item.

Displays:

- Chat title
- Last message preview
- Last updated time
- Rename button
- Delete button

---

## SidebarMenu.tsx

Navigation shortcuts.

Examples:

- Home
- Explore
- Voice
- Images
- Memory
- Subscription
- Settings

---

## UserProfileCard.tsx

Displays:

- Avatar
- Name
- Email
- PRO badge

---

## SidebarFooter.tsx

Contains quick actions.

Examples:

- Upgrade to PRO
- Help
- Feedback
- Logout

---

# Dependencies

These components typically use:

- `@expo/vector-icons`
- `react-native`

Project components:

- `components/common/AppButton`
- `components/common/AppCard`
- `constants/colors`

---

# Backend Integration

Designed to work with endpoints such as:

```http
GET    /api/chats
POST   /api/chats
PUT    /api/chats/{id}
DELETE /api/chats/{id}

GET    /api/users/me
POST   /api/auth/logout
```

---

# Planned Features

- Pin conversations
- Archive chats
- Favorites
- Chat folders
- Conversation search
- Infinite scrolling
- Recent chats
- Multi-select
- Bulk delete
- Drag-and-drop ordering (tablet/desktop)
- Offline chat cache
- Conversation sharing
- Export conversations
- Conversation statistics
- Chat labels
- AI-generated chat titles

---

# Design Goals

The SwiftReply sidebar should be:

- Fast
- Lightweight
- Responsive
- Easy to navigate
- Mobile-friendly
- Desktop-ready
- Accessible

It should provide a familiar experience similar to modern AI assistants while remaining modular and reusable throughout the application.