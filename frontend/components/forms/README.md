# SwiftReply Forms

This folder contains reusable form components used throughout the SwiftReply application.

## Available Forms

- LoginForm
- RegisterForm
- ForgotPasswordForm
- ResetPasswordForm
- ChangePasswordForm
- ProfileForm
- MpesaForm
- PaypalForm
- FeedbackForm
- ContactForm
- SubscriptionForm
- SearchForm

## Design Principles

- Built using reusable common components (`AppInput`, `AppButton`, etc.)
- Connected to backend services where applicable
- Form validation before submission
- Loading indicators during network requests
- User-friendly error and success messages
- Fully typed with TypeScript
- Compatible with Expo Router
- Responsive layouts for Android, iOS, and Web
- Supports future localization

## Dependencies

These forms rely on:

- components/common/*
- services/auth/*
- services/payments/*
- services/api/*
- store/authStore.ts
- constants/colors.ts

## Future Improvements

- React Hook Form integration
- Zod schema validation
- Image picker for profile photo
- Biometric authentication forms
- Two-factor authentication (2FA)
- OTP verification forms
- Multi-step onboarding forms
- Offline form caching
- CAPTCHA support (where applicable)

## Notes

Keep business logic inside the corresponding service files whenever possible. Form components should focus on collecting user input, validation, displaying feedback, and invoking service methods.