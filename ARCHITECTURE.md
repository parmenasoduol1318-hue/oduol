# SwiftReply Architecture & Development Guide

## Architecture Overview

SwiftReply follows a modular, scalable architecture optimized for React Native mobile development.

```
SwiftReply App
├── UI Layer (Components)
│   ├── HomeScreen (Message Analysis)
│   ├── SettingsScreen (Configuration)
│   ├── FavoritesScreen (Saved Replies)
│   └── HistoryScreen (Message History)
├── Business Logic Layer (Services)
│   └── ReplyService (OpenAI Integration)
├── State Management Layer (Store)
│   └── Zustand AppStore
├── Utilities Layer
│   ├── Tone Detection (Local)
│   ├── Intent Detection (Local)
│   └── Localization (i18n)
└── Data Layer
    └── AsyncStorage (Local Persistence)
```

## Core Layers

### 1. Component Layer (`app/components/`)

**Responsibilities:**
- Render UI elements
- Handle user interactions
- Display data visually
- Manage local component state (if needed)

**Files:**
- `HomeScreen.tsx` - Main message analysis interface
- `SettingsScreen.tsx` - User settings configuration

**Guidelines:**
- Keep components focused on UI/UX
- Use React hooks (`useState`, `useCallback`)
- Avoid business logic in components
- Use Zustand store for shared state

### 2. Service Layer (`app/services/`)

**Responsibilities:**
- API communication (OpenAI)
- Complex business logic
- Data transformation
- Error handling

**Files:**
- `ReplyService.ts` - Handles reply generation and analysis

**Guidelines:**
- Keep services stateless
- Handle API errors gracefully
- Return consistent data types
- Use TypeScript interfaces

### 3. Store Layer (`app/store/`)

**Responsibilities:**
- Global state management
- Persistent data storage
- State mutations
- Data retrieval

**Files:**
- `appStore.ts` - Zustand store with AsyncStorage persistence

**Guidelines:**
- Define clear state structure
- Use slices for organization
- Persist sensitive data securely
- Validate data on load

### 4. Utility Layer (`app/utils/`)

**Responsibilities:**
- Reusable helper functions
- Local processing (tone, intent detection)
- Data formatting
- Calculations

**Files:**
- `toneDetector.ts` - Detects message tone without API
- `intentDetector.ts` - Detects message intent without API

**Guidelines:**
- Keep functions pure when possible
- Add comprehensive exports
- Document complex logic
- Test utilities thoroughly

### 5. Type Layer (`app/types/`)

**Responsibilities:**
- TypeScript interfaces
- Type definitions
- Enum-like constants
- Contract definitions

**Files:**
- `index.ts` - All shared types

**Guidelines:**
- Use explicit enums, not string unions
- Document complex types
- Keep types DRY
- Update types with new features

### 6. Localization Layer (`app/locales/`)

**Responsibilities:**
- Translation strings
- Language management
- Text direction (RTL/LTR)
- Language utilities

**Files:**
- `translations.ts` - All language translations
- `i18n.ts` - i18n helper functions

**Guidelines:**
- Keep translations organized by section
- Support all target languages
- Document special characters
- Test with RTL languages

## Data Flow

```
User Interaction
       ↓
Component (HomeScreen)
       ↓
User enters message → Analyze Button Pressed
       ↓
ReplyService.analyzeMessage()
       ↓
Local detection (Tone + Intent)
       ↓
ReplyService.generateReplies()
       ↓
OpenAI API Call (GPT-3.5)
       ↓
Parse Response
       ↓
Store in AppStore (Zustand)
       ↓
AsyncStorage (Persist)
       ↓
Component Re-renders with Results
```

## State Management with Zustand

### Store Structure

```typescript
interface AppState {
  // State
  settings: AppSettings;
  recentMessages: Message[];
  suggestedReplies: SuggestedReplies[];
  favorites: Reply[];

  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  addMessage: (message: Message) => void;
  addSuggestedReplies: (replies: SuggestedReplies) => void;
  // ... other actions
}
```

### Using the Store in Components

```typescript
const { settings, favorites, addFavoriteReply } = useAppStore();

// Or with selector
const apiKey = useAppStore((state) => state.settings.openaiApiKey);
```

### Persistence

- Automatically persists to AsyncStorage
- Loads on app startup
- Key: `'swift-reply-store'`

## API Integration

### OpenAI Service Flow

1. **Initialization**
   ```typescript
   const service = new ReplyService(apiKey);
   ```

2. **Analysis**
   ```typescript
   const { tone, intent } = await service.analyzeMessage(text, language);
   ```

3. **Generation**
   ```typescript
   const replies = await service.generateReplies(text, tone, intent, language);
   ```

4. **Error Handling**
   - Validates API key before requests
   - Returns fallback replies on error
   - Logs errors for debugging

### API Requirements

- OpenAI API key required
- Requires internet connection for generation
- Tone/Intent detection works offline

## Development Workflow

### Adding a New Feature

1. **Define Types**
   ```typescript
   // app/types/index.ts
   export interface NewFeature { ... }
   ```

2. **Add Store Actions**
   ```typescript
   // app/store/appStore.ts
   addNewFeature: (feature: NewFeature) => void;
   ```

3. **Create Utility/Service**
   ```typescript
   // app/utils/newFeature.ts
   export function processFeature(input): output { ... }
   ```

4. **Build UI Component**
   ```typescript
   // app/components/NewFeatureScreen.tsx
   export default function NewFeatureScreen() { ... }
   ```

5. **Add Translations**
   ```typescript
   // app/locales/translations.ts
   newFeature: { label: '...' }
   ```

6. **Integrate with Navigation**
   ```typescript
   // app/index.tsx
   <Tabs.Screen name="new-feature" ... />
   ```

### Best Practices

**DO:**
- ✅ Use TypeScript for all code
- ✅ Keep components small and focused
- ✅ Use custom hooks for logic
- ✅ Handle errors gracefully
- ✅ Test on both platforms
- ✅ Document complex code
- ✅ Use meaningful variable names
- ✅ Commit frequently

**DON'T:**
- ❌ Put business logic in components
- ❌ Use `any` type extensively
- ❌ Ignore error handling
- ❌ Create deeply nested components
- ❌ Hard-code strings (use i18n)
- ❌ Block the main thread
- ❌ Ignore TypeScript warnings
- ❌ Skip error boundaries

## Performance Optimization

### Code Optimization

```typescript
// Use useCallback to prevent unnecessary re-renders
const handleAnalyze = useCallback(async () => {
  // ...
}, [dependencies]);

// Use useMemo for expensive computations
const filteredReplies = useMemo(() => {
  return replies.filter(r => r.confidence > 0.8);
}, [replies]);
```

### Bundle Optimization

- Tree-shaking enabled
- Code splitting via Expo Router
- Lazy load images
- Compress assets

### Network Optimization

- Cache API responses locally
- Batch requests when possible
- Use appropriate timeouts
- Handle slow connections

## Testing

### Unit Testing

```typescript
// Example with Jest
import { detectTone } from '@utils/toneDetector';

describe('Tone Detection', () => {
  test('detects friendly tone', () => {
    expect(detectTone('Hey thanks!')).toBe('friendly');
  });
});
```

### Component Testing

```typescript
import { render, screen } from '@testing-library/react-native';

test('renders message input', () => {
  render(<HomeScreen />);
  expect(screen.getByPlaceholderText(/paste a message/i)).toBeTruthy();
});
```

## Debugging

### Chrome DevTools

```bash
# Start app then press 'j' in Expo CLI
npm start
# Press 'j'
# Opens Chrome DevTools for debugging
```

### React Native Debugger

```bash
# Install globally
npm install -g react-native-debugger

# Start Expo
npm start

# Open React Native Debugger
# It auto-connects to your app
```

### Logs

```typescript
// Console logging
console.log('Debug info:', data);

// Error logging
console.error('Error occurred:', error);

// In terminal, you'll see logs from both iOS and Android
```

## Deployment

### App Store (iOS)

1. Configure in `app.json`
2. Build with EAS: `eas build --platform ios`
3. Submit with Xcode
4. Wait for Apple review

### Google Play (Android)

1. Create keystore
2. Build with EAS: `eas build --platform android`
3. Upload to Play Console
4. Wait for Google review

### Web Deployment

```bash
# Build web version
expo export:web

# Deploy to Vercel, Netlify, or your host
```

## Version Management

### Semver

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Update Expo/Dependencies

```bash
# Check for updates
npm outdated

# Update React Native
npx expo-cli upgrade

# Update specific package
npm update package-name
```

## Security Considerations

1. **API Keys**
   - Never commit `.env` files
   - Use AsyncStorage encryption for sensitive data
   - Rotate keys regularly
   - Use environment variables

2. **Data**
   - Don't log sensitive data
   - Clear cache on logout
   - Use HTTPS for API calls
   - Validate input data

3. **Authentication**
   - Plan for future auth needs
   - Never hardcode credentials
   - Use secure storage

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [OpenAI API Docs](https://platform.openai.com/docs/api-reference)

## Support

For architecture questions or feature suggestions, refer to this guide or check the README.

---

Happy coding! 🚀
