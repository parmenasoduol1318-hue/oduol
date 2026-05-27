# SwiftReply Installation & Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Get OpenAI API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)

### 3. Run the App

```bash
npm start
```

### 4. Open on Device/Emulator

**For iOS:**
- Press `i` in terminal
- Or run: `npm run ios`
- Requires Xcode and iOS 13+

**For Android:**
- Press `a` in terminal  
- Or run: `npm run android`
- Requires Android SDK and emulator/device with Android 8+

**For Web:**
- Press `w` in terminal
- Or run: `npm run web`

### 5. Configure API Key in App

1. Open the app
2. Tap the ⚙️ (Settings) tab at bottom
3. Scroll to "OpenAI API Key" field
4. Paste your API key
5. Tap "Save Settings"

Done! ✅ You're ready to use SwiftReply.

---

## Detailed Installation

### System Requirements

**macOS/Linux:**
- Node.js 14+ and npm/yarn
- Recommended: VS Code or any editor
- For iOS: Xcode 13+ (macOS only)
- For Android: Android Studio + SDK 28+

**Windows:**
- Node.js 14+ and npm/yarn
- Recommended: VS Code
- For Android: Android Studio + SDK 28+
- iOS development requires macOS

### Step-by-Step Setup

#### 1. Prerequisites
```bash
# Check Node version (should be 14+)
node --version

# Install or update npm
npm install -g npm@latest

# Install Expo CLI globally
npm install -g expo-cli
```

#### 2. Clone/Setup Project
```bash
# Navigate to project directory
cd path/to/pam

# Install all dependencies
npm install
```

#### 3. Configure Expo
```bash
# Login to Expo (optional but recommended)
expo login
# Or use: npx expo login

# Create .env file for optional config
echo "OPENAI_API_KEY=your_key_here" > .env
```

#### 4. Development Server
```bash
# Start development server
npm start
# Or: expo start

# This opens the Expo dashboard where you can:
# - Press 'i' to open iOS simulator
# - Press 'a' to open Android emulator
# - Press 'w' to open web browser
# - Scan QR code with Expo Go app on physical device
```

#### 5. Running on Physical Device

**Option A: Expo Go App**
1. Download "Expo Go" from App Store or Play Store
2. Run `npm start`
3. Scan the QR code with your phone's camera
4. Tap the Expo notification

**Option B: iOS Simulator (macOS only)**
```bash
npm run ios
# Requires Xcode installed
```

**Option C: Android Emulator**
```bash
npm run android
# Requires Android Studio with emulator running
```

---

## Configuration

### Environment Setup

Create `.env` file in project root (optional):
```env
OPENAI_API_KEY=sk-your-key-here
EXPO_PUBLIC_API_URL=https://api.openai.com
```

### First Launch Checklist

- [ ] App opens and shows home screen
- [ ] Settings tab accessible
- [ ] Language selector works
- [ ] API key can be entered
- [ ] Message input field functional
- [ ] Can paste test message

---

## Troubleshooting Common Issues

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove existing installations
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Expo won't start

**Solution:**
```bash
# Update Expo
npm install -g expo-cli@latest

# Clear Expo cache
expo start --clear

# Or run and clear cache
npm start -- --clear
```

### Issue: iOS simulator won't open

**Solution:**
```bash
# Check if Xcode is installed
which xcode-select

# If not, install Command Line Tools
xcode-select --install

# Try again
npm run ios
```

### Issue: Android emulator not found

**Solution:**
1. Open Android Studio
2. Open "AVD Manager"
3. Create or start an emulator
4. Run `npm run android`

### Issue: "API key not working"

**Solution:**
1. Verify key at [OpenAI Platform](https://platform.openai.com/api-keys)
2. Ensure you have available credits
3. Check if key is active (not revoked)
4. Try entering key through Settings in app

### Issue: Changes not reflecting in app

**Solution:**
```bash
# Stop current server (Ctrl+C)

# Clear cache and restart
npm start -- --clear

# Or in Expo dashboard, tap 'r' to reload
```

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Verify all dependencies installed
npm list

# Missing? Reinstall
npm install

# Clear and restart
npm start -- --clear
```

---

## Development Workflow

### Make Code Changes
1. Edit files in `app/` directory
2. Changes auto-reload on save (hot reload)
3. Check terminal for errors

### Run Type Checking
```bash
npm run type-check
```

### Run Linting
```bash
npm run lint
```

### Format Code
```bash
npx prettier --write .
```

### Run Tests (when added)
```bash
npm test
```

---

## Building for Production

### Build for iOS
```bash
# Create iOS build
expo build:ios

# Or with EAS (recommended)
eas build --platform ios
```

### Build for Android
```bash
# Create Android APK
expo build:android

# Or with EAS
eas build --platform android
```

### Build for Web
```bash
# Create web build
expo export:web
```

---

## Next Steps

1. **Explore the Code**
   - Check `app/components/HomeScreen.tsx` for main UI
   - See `app/services/ReplyService.ts` for AI logic
   - Review `app/store/appStore.ts` for state management

2. **Customize**
   - Add your branding in `app.json`
   - Modify colors in component styles
   - Add more languages in `app/locales/translations.ts`

3. **Test Features**
   - Try different message tones
   - Test all reply styles
   - Switch between languages
   - Toggle dark/light theme

4. **Deploy** (optional)
   - Use EAS for production builds
   - Set up CI/CD pipeline
   - Publish to App Stores

---

## Support & Resources

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **OpenAI Docs**: https://platform.openai.com/docs
- **Zustand Docs**: https://zustand-demo.vercel.app
- **TypeScript Docs**: https://www.typescriptlang.org

---

## Performance Tips

1. **For Slow Loading**
   - Upgrade to faster internet
   - Check OpenAI API rate limits
   - Clear Expo cache: `npm start -- --clear`

2. **For Better Development**
   - Use Physical device instead of emulator
   - Disable unnecessary features during testing
   - Monitor network requests in terminal

3. **For Faster Builds**
   - Use Android emulator with hardware acceleration
   - Close unnecessary apps while building
   - Increase available RAM if possible

---

Happy coding! 🚀

For more help, check the [README.md](./README.md) for full documentation.
