# SwiftReply Frontend

SwiftReply is an AI-powered mobile application built with **React Native**, **Expo**, and **TypeScript**. It provides intelligent conversations, voice interaction, image generation, personal memory, subscriptions, and payment integration in a modern ChatGPT-style interface.

---

# Features

## AI Chat

- Multiple conversations
- Chat history
- Streaming responses
- Markdown support
- Code highlighting
- Conversation search
- Rename chats
- Delete chats

---

## Authentication

- Register
- Login
- Logout
- Refresh tokens
- Forgot password
- Reset password
- Change password
- Profile management

---

## Voice AI

- Voice recording
- Speech-to-text
- Text-to-speech
- AI voice conversations
- Voice call interface
- Audio playback
- Waveform animations

---

## AI Images

- Image generation
- Image history
- Image preview
- Upload images
- Download images
- Share images

---

## Memory

Personal AI memory system.

Supports:

- Save memories
- Edit memories
- Delete memories
- Search memories
- Memory statistics
- Memory settings

---

## Subscription

Supports Free and Pro plans.

Pro unlocks:

- Unlimited chats
- Faster AI responses
- Voice conversations
- Image generation
- Premium features

---

## Payments

### M-Pesa

- STK Push
- Payment verification
- Subscription activation

### PayPal

- Checkout
- Subscription purchase
- Payment history

---

## Settings

- Account
- Privacy
- Notifications
- Appearance
- Language
- About

---

# Technologies

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Router (optional)
- Axios
- AsyncStorage
- Expo Secure Store
- Expo Audio
- Expo Image Picker

---

# Project Structure

```text
frontend/
│
├── api/
├── assets/
├── components/
├── constants/
├── contexts/
├── hooks/
├── navigation/
├── screens/
├── services/
├── store/
├── types/
├── utils/
│
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

# Components

The application is organized into reusable components.

Examples include:

- Common UI
- Forms
- Images
- Memory
- Settings
- Sidebar
- Voice
- UI utilities

---

# State Management

Shared state is managed using React Context and custom hooks.

Examples:

- Authentication
- Theme
- Chat
- Subscription
- Voice
- Memory

---

# API Communication

The frontend communicates with the backend through REST APIs.

Typical endpoints include:

```http
POST /api/auth/login
POST /api/auth/register
GET  /api/users/me

GET  /api/chat/history
POST /api/chat/send

POST /api/images/generate

POST /api/payments/mpesa/stkpush
POST /api/payments/mpesa/callback

POST /api/payments/paypal/create-order

GET  /api/memory
POST /api/memory

POST /api/voice/transcribe
POST /api/voice/chat
```

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npx expo start
```

Run on Android.

```bash
npx expo run:android
```

Run on iOS.

```bash
npx expo run:ios
```

Run on the web.

```bash
npx expo start --web
```

---

# Environment Variables

Create a `.env` file.

Example:

```env
EXPO_PUBLIC_API_URL=https://your-backend-url.com

EXPO_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

EXPO_PUBLIC_APP_NAME=SwiftReply
```

---

# Design Goals

SwiftReply focuses on:

- Fast performance
- Beautiful UI
- Modular architecture
- Offline-friendly behavior
- Accessibility
- Responsive layouts
- Scalable codebase
- Clean developer experience

---

# Future Roadmap

Planned improvements include:

- AI agent workflows
- Multi-modal conversations
- Live streaming responses
- Team workspaces
- Shared chats
- Voice interruption (barge-in)
- Offline AI features
- Plugin support
- Cloud synchronization
- Desktop application
- Tablet-optimized layouts
- Wearable device integration

---

# Backend

The frontend connects to a FastAPI backend that provides:

- Authentication
- AI chat
- Image generation
- Voice services
- Memory
- M-Pesa integration
- PayPal integration
- User management
- Subscription management

---

# License

This project is intended for the SwiftReply platform. Refer to the project's license for usage and distribution terms.