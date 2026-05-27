# SwiftReply 💬

SwiftReply is a fast, lightweight communication assistant that helps users respond to messages with ease. Using intelligent text analysis, SwiftReply detects the tone of any message and instantly suggests clear, well-crafted replies in multiple styles.

## Features

### 🎯 Core Features
- **Smart Message Intent Detection** - Identifies if messages are questions, statements, requests, warnings, flirting, joking, help requests, complaints, or compliments
- **Tone Analysis** - Automatically detects the tone: friendly, serious, angry, formal, joking, confused, supportive, or neutral
- **Multiple Reply Styles** - Generate replies in different styles: short, friendly, formal, funny, creative
- **Multi-Language Support** - English, Swahili, French, Arabic with language auto-detection
- **Favorites System** - Save and reuse your best replies
- **Message History** - Keep track of all analyzed messages and suggestions
- **Dark/Light Theme** - Customizable UI themes

### 🚀 Advanced Features
- **OpenAI API Integration** - Uses GPT-3.5-turbo for intelligent reply generation
- **Local Tone Detection** - Fast keyword-based tone detection without API calls
- **Offline Support** - Graceful fallback for offline scenarios
- **Responsive Design** - Optimized for both iOS and Android

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Zustand
- **API Integration**: OpenAI SDK
- **Routing**: Expo Router
- **Storage**: AsyncStorage
- **Localization**: i18n-js with custom translations

## Getting Started

### Prerequisites

- Node.js (14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS/Android emulator or physical device

### Installation

1. **Clone the repository**
   ```bash
   cd pam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure OpenAI API Key**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Open the app and go to Settings
   - Paste your API key in the "OpenAI API Key" field
   - Save settings

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - **iOS**: Press `i` in terminal or `npm run ios`
   - **Android**: Press `a` in terminal or `npm run android`
   - **Web**: Press `w` in terminal or `npm run web`

## Project Structure

```
app/
├── _layout.tsx              # Root layout with Stack navigation
├── index.tsx                # Home screen with tab navigation
├── favorites.tsx            # Favorites screen
├── history.tsx              # Message history screen
├── settings.tsx             # Settings screen
├── components/
│   ├── HomeScreen.tsx       # Main message analysis UI
│   └── SettingsScreen.tsx   # Settings configuration UI
├── services/
│   └── ReplyService.ts      # OpenAI API integration
├── store/
│   └── appStore.ts          # Zustand state management
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── toneDetector.ts      # Local tone detection
│   └── intentDetector.ts    # Message intent detection
└── locales/
    ├── translations.ts      # Translation strings (EN, SW, FR, AR)
    └── i18n.ts             # Localization helpers
```

## Usage

### Analyzing a Message

1. **Go to Home Tab**
   - Paste or type a message you received
   - Tap "Analyze" button

2. **View Analysis**
   - See detected tone and intent
   - Review suggested replies in different styles

3. **Use a Reply**
   - Tap "Copy" to copy a reply to clipboard
   - Tap ⭐ to save as favorite

### Managing Favorites

- **Favorites Tab** - View all saved replies
- **Copy** - Share or copy to clipboard
- **Delete** - Remove from favorites

### Viewing History

- **History Tab** - See all previously analyzed messages
- **Tone & Intent Badges** - Quick view of message analysis
- **Timestamps** - Know when you analyzed each message

### Customizing Settings

- **API Key** - Configure your OpenAI API key
- **Language** - Choose from English, Swahili, French, Arabic
- **Reply Style** - Set your preferred default reply style
- **Theme** - Light, dark, or auto (matches system)

## Configuration

### Environment Variables

Create a `.env` file (optional):
```
OPENAI_API_KEY=your_api_key_here
```

However, it's recommended to set the API key through the Settings screen in the app for security.

## API Reference

### ReplyService

```typescript
const service = new ReplyService(apiKey);

// Analyze a message
const analysis = await service.analyzeMessage(messageContent, language);
// Returns: { tone: MessageTone, intent: MessageIntent }

// Generate reply suggestions
const replies = await service.generateReplies(
  message,
  tone,
  intent,
  language,
  styles
);
// Returns: Reply[]

// Generate reply in specific style
const reply = await service.generateReplyInStyle(message, style, language);
// Returns: string
```

## Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English  | en   | ✅ Full Support |
| Swahili  | sw   | ✅ Full Support |
| French   | fr   | ✅ Full Support |
| Arabic   | ar   | ✅ Full Support |

## Data Privacy

- **Local Processing**: Tone detection runs locally without sending data
- **API Calls**: Only message text is sent to OpenAI for reply generation
- **Storage**: All data is stored locally on your device
- **No Tracking**: SwiftReply doesn't track user behavior

## Troubleshooting

### API Key Not Working
- Verify the key is correct at [OpenAI Platform](https://platform.openai.com/api-keys)
- Ensure your account has available credits
- Check network connectivity

### Long Loading Times
- Replies are typically generated in 2-5 seconds
- Slower internet or high API usage may increase time
- Check your OpenAI API rate limits

### Language Not Detected Correctly
- Language detection happens based on content keywords
- You can override in Settings > Language
- Try providing more text for better accuracy

## Contributing

We welcome contributions! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Voice-to-Reply feature (speech-to-text)
- [ ] Chat summaries for long conversations
- [ ] Personal reply style learning
- [ ] Custom auto-responses
- [ ] Integration with messaging apps (WhatsApp, Messenger)
- [ ] Safe Mode for teens with toxic message warnings
- [ ] Lightweight offline AI models
- [ ] More language support (Spanish, Portuguese, Italian)
- [ ] Emoji suggestions
- [ ] Reply templates system

## Performance

- **Tone Detection**: < 100ms (local)
- **Reply Generation**: 2-5 seconds (API dependent)
- **App Size**: ~50MB (iOS), ~45MB (Android)
- **Min OS Support**: iOS 13+, Android 8+

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: See this README
- **Issues**: Report bugs on GitHub Issues
- **Discussion**: Start a Discussion for features or questions

## Acknowledgments

- OpenAI for GPT-3.5-turbo API
- React Native and Expo communities
- Contributors and testers

---

Built with ❤️ for faster, smarter communication
