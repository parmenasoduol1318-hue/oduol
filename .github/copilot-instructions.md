<!-- SwiftReply Project Customization -->
SwiftReply is a React Native mobile app for intelligent message reply suggestions.

## Project Reference
- Framework: React Native with Expo
- Language: TypeScript
- Key Libraries: Zustand (state), OpenAI SDK, AsyncStorage
- Multi-language Support: English, Swahili, French, Arabic

## Implementation Priority
When working on SwiftReply, prioritize in this order:
1. Core reply generation and tone detection
2. UI components and user experience
3. Multi-language support
4. Settings and personalization
5. Advanced features (voice, integrations)

## Development Guidelines
- Use TypeScript for type safety
- Maintain react-native/expo best practices
- Store sensitive data (API keys) securely
- Test on both iOS and Android when possible
- Keep UI responsive and accessible

## Code Organization
- `app/` - Main app code with Expo Router
- `app/types/` - Type definitions
- `app/store/` - Zustand state management
- `app/services/` - API and business logic
- `app/components/` - React components
- `app/utils/` - Helper functions
- `app/locales/` - Translations and i18n

## Key Components
- HomeScreen: Message analysis and reply generation
- SettingsScreen: Configuration and preferences
- FavoritesScreen: Saved replies library
- HistoryScreen: Message history
