# Voice Components

The `voice` folder contains reusable components that power SwiftReply's voice experience, including voice recording, AI voice conversations, audio playback, speech transcription, and waveform visualization.

These components are designed to work together while remaining modular and reusable across the application.

---

# Folder Structure

```text
frontend/components/voice
│
├── AudioPlayer.tsx
├── MicrophoneButton.tsx
├── README.md
├── RecordingControls.tsx
├── RecordingTimer.tsx
├── SpeechTranscript.tsx
├── VoiceCallButton.tsx
├── VoiceCallModal.tsx
├── VoiceRecorder.tsx
└── Waveform.tsx
```

---

# Components

## AudioPlayer

Reusable audio playback component.

Features:

- Play / Pause
- Progress bar
- Duration
- Current playback time
- Seek support (future)
- AI response playback
- User recording playback

---

## MicrophoneButton

Reusable microphone button.

Supports:

- Idle state
- Recording state
- Loading state
- Disabled state

---

## RecordingControls

Controls the recording session.

Functions:

- Start
- Pause
- Resume
- Stop
- Cancel
- Save recording

---

## RecordingTimer

Displays recording duration.

Examples:

- 00:05
- 01:42
- 09:58

---

## SpeechTranscript

Displays live speech-to-text results.

Supports:

- Streaming transcription
- Final transcript
- Copy
- Edit
- Retry

---

## VoiceCallButton

Starts an AI voice conversation.

Examples:

- Voice Chat
- Call AI
- Talk to Copilot

---

## VoiceCallModal

Full-screen voice conversation interface.

Displays:

- AI avatar
- User avatar
- Call timer
- Connection status
- Mute button
- Speaker button
- End call button
- Live transcript

---

## VoiceRecorder

Main recording component.

Responsibilities:

- Request microphone permission
- Start recording
- Stop recording
- Save audio
- Return recorded file
- Upload to backend

---

## Waveform

Animated waveform visualization.

Modes:

- Recording
- Playback
- Live voice call
- AI speaking

---

# Dependencies

These components are intended to integrate with:

- React Native
- `@expo/vector-icons`

Audio-related packages (when added):

- `expo-audio` (recommended) or `expo-av`
- `expo-file-system`

Speech services:

- OpenAI Speech-to-Text
- OpenAI Text-to-Speech
- Whisper-compatible APIs

---

# Backend Integration

These components are designed to work with endpoints such as:

```http
POST /api/voice/transcribe
POST /api/voice/chat
POST /api/voice/tts
POST /api/voice/upload
GET  /api/voice/history
```

---

# Planned Features

Future enhancements include:

- Voice interruption ("barge-in")
- Wake word support ("Copilot")
- Real-time streaming audio
- Noise suppression
- Echo cancellation
- Voice activity detection (VAD)
- Multiple AI voices
- Playback speed controls
- Download recordings
- Share recordings
- Voice history
- Voice bookmarks
- Offline recording queue
- Background recording support
- Bluetooth headset support
- Automatic language detection
- Multi-language conversations

---

# SwiftReply Voice Experience

The voice system is designed to provide a natural conversational experience with AI.

Goals include:

- Fast response times
- High-quality audio playback
- Reliable recording
- Low latency
- Clear transcription
- Modern UI
- Smooth animations
- Modular architecture
- Easy backend integration
- Cross-platform compatibility

These components form the foundation of SwiftReply's AI voice assistant and future real-time voice calling capabilities.