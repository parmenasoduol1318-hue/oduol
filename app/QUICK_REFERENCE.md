# SwiftReply Quick Reference

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete project overview, features, and usage |
| **INSTALLATION.md** | Step-by-step setup and troubleshooting |
| **ARCHITECTURE.md** | Technical architecture and development guide |
| **FEATURES.md** | Feature list and development roadmap |
| **.github/copilot-instructions.md** | Project customization guidelines |

## 🚀 Quick Start (3 steps)

```bash
# 1. Install dependencies
npm install

# 2. Get OpenAI API key from https://platform.openai.com/api-keys

# 3. Start the app
npm start
```

## 📱 Running the App

```bash
# iOS (macOS only)
npm run ios

# Android
npm run android

# Web
npm run web

# Expo Go (scan QR code on physical device)
npm start
```

## 🛠️ Development Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing (when configured)
npm test

# Format code
npx prettier --write .
```

## 📁 Project Structure

```
pam/
├── app/
│   ├── _layout.tsx           # Root navigation
│   ├── index.tsx             # Tab navigation
│   ├── favorites.tsx         # Favorites tab
│   ├── history.tsx           # History tab
│   ├── settings.tsx          # Settings tab
│   ├── components/           # React components
│   ├── services/             # API services
│   ├── store/                # State management
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   └── locales/              # Translations
├── package.json              # Dependencies
├── app.json                  # Expo config
├── tsconfig.json             # TypeScript config
├── README.md                 # Documentation
├── INSTALLATION.md           # Setup guide
├── ARCHITECTURE.md           # Tech guide
└── FEATURES.md               # Feature list
```

## 🔑 API & Keys

**OpenAI Setup:**
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key
4. Enter in SwiftReply Settings tab

**Cost:**
- GPT-3.5-turbo: ~$0.0005 per 1K input tokens
- Test message: ~$0.0001-0.0002 per reply

## 🌍 Supported Languages

| Code | Language | Status |
|------|----------|--------|
| en | English | ✅ Full |
| sw | Swahili | ✅ Full |
| fr | French | ✅ Full |
| ar | Arabic | ✅ Full |

## 🎨 UI Components

- **HomeScreen** - Main message analysis interface
- **SettingsScreen** - Configuration and preferences
- **FavoritesScreen** - Saved replies management
- **HistoryScreen** - Message history view

## 🔒 Security

- API keys stored securely in AsyncStorage
- No data sent beyond OpenAI API
- All local data encrypted at device level
- No user tracking or analytics

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| npm install fails | `npm cache clean --force && npm install` |
| App won't start | `npm start -- --clear` |
| API key error | Verify key at platform.openai.com |
| No iOS simulator | Install Xcode: `xcode-select --install` |
| Android emulator not found | Start emulator in Android Studio |

## 🔄 Development Workflow

1. **Make Changes**
   - Edit files in `app/` directory
   - Changes auto-reload on save

2. **Test Changes**
   - Manually test on device/emulator
   - Check for TypeScript errors
   - View console logs

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Feature: Description"
   ```

4. **Push to Repository**
   ```bash
   git push origin main
   ```

## 📊 Performance Targets

- App size: < 50MB (iOS), < 45MB (Android)
- Min OS: iOS 13+, Android 8+
- Tone detection: < 100ms (local)
- Reply generation: 2-5 seconds (API)

## 🚀 Deployment

### Test on Device
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Deploy to Stores
- iOS App Store: Use Xcode + App Store Connect
- Google Play: Use Play Console
- Web: Deploy to Vercel/Netlify

## 📞 Support Resources

| Resource | Link |
|----------|------|
| React Native | https://reactnative.dev |
| Expo | https://docs.expo.dev |
| OpenAI API | https://platform.openai.com/docs |
| TypeScript | https://www.typescriptlang.org |
| Zustand | https://github.com/pmndrs/zustand |

## 🎯 Next Steps

1. **First Time?**
   - Read [INSTALLATION.md](./INSTALLATION.md)
   - Follow the Quick Start steps

2. **Want to Code?**
   - Review [ARCHITECTURE.md](./ARCHITECTURE.md)
   - Check component examples

3. **Feature Ideas?**
   - See [FEATURES.md](./FEATURES.md)
   - Follow contributing guidelines

4. **Having Issues?**
   - Check INSTALLATION.md troubleshooting
   - Review error messages in terminal
   - Check Expo logs

## 📝 Code Examples

### Using the Store
```typescript
import { useAppStore } from '@store/appStore';

const { settings, favorites, addFavoriteReply } = useAppStore();
```

### Detecting Tone
```typescript
import { detectTone } from '@utils/toneDetector';

const tone = detectTone('Thanks so much!', 'en'); // 'friendly'
```

### Generating Replies
```typescript
import ReplyService from '@services/ReplyService';

const service = new ReplyService(apiKey);
const replies = await service.generateReplies(
  message,
  tone,
  intent,
  language,
  ['short', 'friendly', 'funny']
);
```

### Translations
```typescript
import { getTranslation } from '@locales/i18n';

const t = getTranslation('en');
console.log(t.home.title); // 'Write a Message'
```

## ✅ Pre-Commit Checklist

Before committing code:
- [ ] Code compiles without errors
- [ ] TypeScript checks pass: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Tested on at least one platform
- [ ] No console errors/warnings
- [ ] Commit message is descriptive

## 🎓 Learning Resources

### For React Native Beginners
- Expo Quick Start: https://docs.expo.dev/get-started/create-a-new-app/
- React Native Tutorial: https://reactnative.dev/docs/getting-started

### For TypeScript Learners
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React + TypeScript Guide: https://react-typescript-cheatsheet.netlify.app

### For Zustand Users
- Zustand Docs: https://github.com/pmndrs/zustand
- State Management Guide: https://zustand-demo.vercel.app

---

## 💡 Tips & Tricks

1. **Hot Reload**: Changes to code auto-reload in app (just save file)
2. **Clear Cache**: `npm start -- --clear` for force refresh
3. **Debug Mode**: Press `j` in Expo CLI to open Chrome DevTools
4. **Logs**: Watch terminal for real-time app logs and errors
5. **TypeScript**: Use strict mode for better type safety

---

**Last Updated:** May 27, 2026  
**Version:** 1.0.0

For more details, see the [README.md](./README.md) 📖
