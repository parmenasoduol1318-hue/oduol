# Memory Components

This folder contains reusable components that power the **SwiftReply AI Memory** system.

The memory system allows SwiftReply to remember user preferences, personal information, conversation context, and other saved data to provide more personalized AI responses.

---

# Components

## MemoryCard.tsx

Displays a memory in a card layout.

Features:

- Title
- Content preview
- Category badge
- Last updated date
- Edit button
- Delete button

---

## MemoryItem.tsx

Compact memory list item.

Features:

- Optimized for FlatList
- Category label
- Quick actions
- Mobile friendly

---

## MemoryList.tsx

Displays a scrollable list of memories.

Features:

- Loading state
- Empty state
- Memory selection
- Edit/Delete callbacks

---

## MemorySearch.tsx

Reusable search component.

Features:

- Debounced search
- Clear button
- Loading indicator

---

## MemoryEditor.tsx

Create or edit memories.

Supports:

- Title
- Category
- Memory content
- Validation
- Save callback

---

## MemoryStats.tsx

Dashboard statistics.

Displays:

- Total memories
- Personal memories
- Work memories
- Favorite memories

---

## MemorySettings.tsx

Allows users to configure how SwiftReply remembers information.

Supports:

- Enable/disable memory
- Auto-save memories
- Remember chat context

---

## MemoryEmpty.tsx

Shown when no memories exist.

Features:

- Friendly empty state
- Create memory shortcut

---

## MemoryDeleteModal.tsx

Confirmation dialog before deleting a memory.

Features:

- Cancel
- Delete
- Loading state

---

# Folder Structure

```text
components/memory
│
├── MemoryCard.tsx
├── MemoryDeleteModal.tsx
├── MemoryEditor.tsx
├── MemoryEmpty.tsx
├── MemoryItem.tsx
├── MemoryList.tsx
├── MemorySearch.tsx
├── MemorySettings.tsx
├── MemoryStats.tsx
└── README.md
```

---

# Dependencies

These components rely on:

- `components/common/AppButton`
- `components/common/AppInput`
- `constants/colors`
- `@expo/vector-icons`

Business logic, API requests, and persistence should be handled in the service and store layers (for example, `services/memory` and `store/memoryStore`), while these components remain focused on presentation and user interaction.

---

# Planned Backend Integration

These components are intended to work with endpoints such as:

- `GET /memory`
- `POST /memory`
- `PUT /memory/{id}`
- `DELETE /memory/{id}`
- `GET /memory/search`
- `GET /memory/stats`
- `PATCH /memory/settings`

---

# Planned Future Features

- AI-suggested memories
- Memory pinning
- Favorite memories
- Memory tags
- Automatic categorization
- Import/export memories
- Memory synchronization across devices
- Voice memories
- Image memories
- Search filters
- Timeline view
- Memory sharing
- Offline memory cache
- Memory encryption
- Memory version history
- Bulk delete and restore
- Duplicate detection
- Smart reminders
- Analytics dashboard
- Memory usage insights

---

# SwiftReply Memory Philosophy

SwiftReply's memory system is designed to be:

- User-controlled
- Transparent
- Easy to edit
- Easy to delete
- Privacy-focused
- Fast to search
- Scalable as the application grows

Users should always be able to view, modify, or remove stored memories, with memory features enhancing personalization without taking control away from the user.