// frontend/lib/validators.ts

/* ======================================================
   Email
====================================================== */

export function isValidEmail(
  email: string
): boolean {
  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email.trim());
}

/* ======================================================
   Password
====================================================== */

export function isValidPassword(
  password: string
): boolean {
  return password.length >= 8;
}

export function hasUppercase(
  password: string
): boolean {
  return /[A-Z]/.test(password);
}

export function hasLowercase(
  password: string
): boolean {
  return /[a-z]/.test(password);
}

export function hasNumber(
  password: string
): boolean {
  return /\d/.test(password);
}

export function hasSpecialCharacter(
  password: string
): boolean {
  return /[!@#$%^&*(),.?":{}|<>]/.test(
    password
  );
}

export function isStrongPassword(
  password: string
): boolean {
  return (
    isValidPassword(password) &&
    hasUppercase(password) &&
    hasLowercase(password) &&
    hasNumber(password) &&
    hasSpecialCharacter(password)
  );
}

/* ======================================================
   Phone Number (Kenya)
====================================================== */

export function isValidKenyanPhone(
  phone: string
): boolean {
  const cleaned =
    phone.replace(/\s/g, "");

  return /^(?:\+254|254|0)?7\d{8}$/.test(
    cleaned
  );
}

/* ======================================================
   Required
====================================================== */

export function isRequired(
  value: unknown
): boolean {
  if (value === null || value === undefined)
    return false;

  if (typeof value === "string")
    return value.trim().length > 0;

  return true;
}

/* ======================================================
   Length
====================================================== */

export function minLength(
  value: string,
  length: number
): boolean {
  return value.trim().length >= length;
}

export function maxLength(
  value: string,
  length: number
): boolean {
  return value.trim().length <= length;
}

/* ======================================================
   Numbers
====================================================== */

export function isNumber(
  value: string
): boolean {
  return !Number.isNaN(Number(value));
}

export function isPositiveNumber(
  value: number
): boolean {
  return value > 0;
}

/* ======================================================
   URL
====================================================== */

export function isValidUrl(
  url: string
): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/* ======================================================
   OTP
====================================================== */

export function isValidOTP(
  otp: string
): boolean {
  return /^\d{4,8}$/.test(otp);
}

/* ======================================================
   Username
====================================================== */

export function isValidUsername(
  username: string
): boolean {
  return /^[a-zA-Z0-9_.]{3,30}$/.test(
    username
  );
}

/* ======================================================
   Empty
====================================================== */

export function isEmpty(
  value: string
): boolean {
  return value.trim().length === 0;
}

/* ======================================================
   Match
====================================================== */

export function passwordsMatch(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

/* ======================================================
   File Size
====================================================== */

export function isValidFileSize(
  bytes: number,
  maxMB: number
): boolean {
  return (
    bytes <=
    maxMB * 1024 * 1024
  );
}

/* ======================================================
   Image Extension
====================================================== */

export function isImageFile(
  filename: string
): boolean {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(
    filename
  );
}

/* ======================================================
   Generic Validator
====================================================== */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}