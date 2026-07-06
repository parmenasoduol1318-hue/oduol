# Settings Components

This folder contains reusable settings-related UI components used throughout the SwiftReply application.

---

# Overview

The settings module allows users to manage:

- Account information
- Appearance preferences
- Language preferences
- Notifications
- Privacy and security
- Subscription settings
- App information
- Logout and account deletion

---

# Folder Structure

```text
frontend/components/settings
│
├── AboutSettings.tsx
├── AccountSettings.tsx
├── AppearanceSettings.tsx
├── DangerZone.tsx
├── LanguageSettings.tsx
├── NotificationSettings.tsx
├── PrivacySettings.tsx
├── SettingsButton.tsx
├── SettingsCard.tsx
├── SettingsItem.tsx
├── SettingsSection.tsx
├── SettingsSwitch.tsx
└── README.md
```

---

# Components

## AboutSettings.tsx

Displays application information.

Features:

- App name
- Version
- Description
- Privacy policy link
- Terms of service link
- Support link
- Copyright information

---

## AccountSettings.tsx

Displays account-related settings.

Features:

- User profile summary
- Email display
- Subscription status
- Edit profile
- Change password
- Manage subscription

---

## AppearanceSettings.tsx

Controls visual preferences.

Features:

- Light mode
- Dark mode
- System theme

Future:

- Accent colors
- Font size controls
- Custom themes

---

## LanguageSettings.tsx

Language selection interface.

Features:

- English
- Swahili
- French

Future:

- Sheng
- Arabic
- Portuguese
- Local African languages

---

## NotificationSettings.tsx

Controls notification preferences.

Features:

- Push notifications
- Email notifications
- Marketing notifications
- Reminder notifications

---

## PrivacySettings.tsx

Controls privacy and security preferences.

Features:

- Chat history
- AI memory
- Analytics
- Usage data sharing

Future:

- Data export
- Data deletion
- Device management
- Session management

---

## DangerZone.tsx

Contains destructive account actions.

Features:

- Logout
- Delete account
- Confirmation prompts

---

# Planned Shared Components

These files support reusable settings screens:

---

## SettingsItem.tsx

Reusable settings row.

Example:

```tsx
<SettingsItem
  title="Notifications"
  icon="notifications-outline"
  onPress={handleNotifications}
/>
```

---

## SettingsSwitch.tsx

Reusable switch row.

Example:

```tsx
<SettingsSwitch
  title="Enable Memory"
  value={enabled}
  onValueChange={setEnabled}
/>
```

---

## SettingsCard.tsx

Reusable settings container.

Example:

```tsx
<SettingsCard>
  {children}
</SettingsCard>
```

---

## SettingsSection.tsx

Reusable section grouping.

Example:

```tsx
<SettingsSection title="Privacy">
  {children}
</SettingsSection>
```

---

## SettingsButton.tsx

Reusable settings action button.

Example:

```tsx
<SettingsButton
  title="Save Changes"
  onPress={handleSave}
/>
```

---

# Dependencies

Most settings components use:

```json
{
  "@expo/vector-icons": "*",
  "react-native": "*"
}
```

And project components:

```text
components/common/AppButton
components/common/AppCard
components/common/AppModal
constants/colors
```

---

# Backend Integration

Settings screens are designed to work with API endpoints such as:

```http
GET    /api/users/me
PUT    /api/users/me

PUT    /api/settings
GET    /api/settings

POST   /api/auth/logout

DELETE /api/users/me
```

---

# SwiftReply Settings Goals

The settings experience should be:

- Simple
- Fast
- Mobile-friendly
- Consistent
- Secure
- Easy to understand

Users should be able to manage their account, subscription, privacy, and preferences without navigating through complicated menus.

---

# Future Enhancements

Planned improvements:

- Theme customization
- Accent colors
- Voice settings
- AI personality selection
- Chat style preferences
- Backup & restore
- Device management
- Security center
- Two-factor authentication
- Biometric authentication
- Usage statistics
- Subscription analytics
- Advanced privacy controls
- Developer mode
- Experimental features

---

SwiftReply Settings are designed to scale as new features are added while maintaining a clean and intuitive user experience.