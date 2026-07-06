// frontend/locales/translations.ts

export type SupportedLanguage =
  | "en"
  | "sw";

export type TranslationDictionary = Record<
  string,
  string
>;

export const translations: Record<
  SupportedLanguage,
  TranslationDictionary
> = {
  /* ======================================================
     English
  ====================================================== */

  en: {
    app_name: "SwiftReply",

    welcome: "Welcome",
    hello: "Hello",

    login: "Login",
    logout: "Logout",
    register: "Register",

    email: "Email",
    password: "Password",
    confirm_password: "Confirm Password",

    continue: "Continue",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    retry: "Retry",

    loading: "Loading...",
    searching: "Searching...",
    generating: "Generating...",

    send: "Send",

    new_chat: "New Chat",

    chats: "Chats",

    history: "History",

    memory: "Memory",

    settings: "Settings",

    profile: "Profile",

    notifications: "Notifications",

    appearance: "Appearance",

    language: "Language",

    privacy: "Privacy",

    account: "Account",

    about: "About",

    dark_mode: "Dark Mode",

    light_mode: "Light Mode",

    system_theme: "System",

    voice: "Voice",

    image_generation:
      "Image Generation",

    upload_image:
      "Upload Image",

    take_photo:
      "Take Photo",

    microphone:
      "Microphone",

    recording:
      "Recording...",

    stop_recording:
      "Stop Recording",

    subscription:
      "Subscription",

    upgrade_to_pro:
      "Upgrade to Pro",

    free_plan:
      "Free Plan",

    pro_plan:
      "Pro Plan",

    mpesa:
      "M-Pesa",

    paypal:
      "PayPal",

    payment:
      "Payment",

    success:
      "Success",

    failed:
      "Failed",

    error:
      "Error",

    no_internet:
      "No internet connection.",

    try_again:
      "Try Again",

    offline:
      "Offline",

    online:
      "Online",
  },

  /* ======================================================
     Kiswahili
  ====================================================== */

  sw: {
    app_name: "SwiftReply",

    welcome: "Karibu",

    hello: "Habari",

    login: "Ingia",

    logout: "Toka",

    register:
      "Jisajili",

    email:
      "Barua pepe",

    password:
      "Nenosiri",

    confirm_password:
      "Thibitisha Nenosiri",

    continue:
      "Endelea",

    cancel:
      "Ghairi",

    save:
      "Hifadhi",

    delete:
      "Futa",

    edit:
      "Hariri",

    retry:
      "Jaribu tena",

    loading:
      "Inapakia...",

    searching:
      "Inatafuta...",

    generating:
      "Inazalisha...",

    send:
      "Tuma",

    new_chat:
      "Mazungumzo Mapya",

    chats:
      "Mazungumzo",

    history:
      "Historia",

    memory:
      "Kumbukumbu",

    settings:
      "Mipangilio",

    profile:
      "Wasifu",

    notifications:
      "Arifa",

    appearance:
      "Mwonekano",

    language:
      "Lugha",

    privacy:
      "Faragha",

    account:
      "Akaunti",

    about:
      "Kuhusu",

    dark_mode:
      "Mandhari Meusi",

    light_mode:
      "Mandhari Meupe",

    system_theme:
      "Mfumo",

    voice:
      "Sauti",

    image_generation:
      "Uundaji wa Picha",

    upload_image:
      "Pakia Picha",

    take_photo:
      "Piga Picha",

    microphone:
      "Maikrofoni",

    recording:
      "Inarekodi...",

    stop_recording:
      "Simamisha Kurekodi",

    subscription:
      "Usajili",

    upgrade_to_pro:
      "Pata Pro",

    free_plan:
      "Mpango wa Bure",

    pro_plan:
      "Mpango wa Pro",

    mpesa:
      "M-Pesa",

    paypal:
      "PayPal",

    payment:
      "Malipo",

    success:
      "Imefanikiwa",

    failed:
      "Imeshindikana",

    error:
      "Hitilafu",

    no_internet:
      "Hakuna muunganisho wa intaneti.",

    try_again:
      "Jaribu Tena",

    offline:
      "Nje ya Mtandao",

    online:
      "Mtandaoni",
  },
};

/* ======================================================
   Translation Helper
====================================================== */

export function t(
  language: SupportedLanguage,
  key: string
): string {
  return (
    translations[language]?.[key] ??
    translations.en[key] ??
    key
  );
}

export default translations;