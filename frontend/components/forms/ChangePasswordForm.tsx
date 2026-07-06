// components/forms/ChangePasswordForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";
import authService from "../../services/auth/authService";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [currentError, setCurrentError] =
    useState("");

  const [newError, setNewError] =
    useState("");

  const [confirmError, setConfirmError] =
    useState("");

  const [success, setSuccess] = useState("");

  const validate = () => {
    let valid = true;

    setCurrentError("");
    setNewError("");
    setConfirmError("");
    setSuccess("");

    if (!currentPassword) {
      setCurrentError("Current password is required");
      valid = false;
    }

    if (!newPassword) {
      setNewError("New password is required");
      valid = false;
    } else if (newPassword.length < 8) {
      setNewError(
        "Password must be at least 8 characters."
      );
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Confirm your password");
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmError("Passwords do not match");
      valid = false;
    }

    return valid;
  };

  const handleChangePassword = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setSuccess(
        "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setCurrentError(
        error?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        label="Current Password"
        placeholder="Enter current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secure
        icon="lock-closed-outline"
        error={currentError}
        required
      />

      <AppInput
        label="New Password"
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secure
        icon="key-outline"
        error={newError}
        required
      />

      <AppInput
        label="Confirm Password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secure
        icon="shield-checkmark-outline"
        error={confirmError}
        required
      />

      {success ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            {success}
          </Text>
        </View>
      ) : null}

      <AppButton
        title="Change Password"
        icon="save-outline"
        loading={loading}
        onPress={handleChangePassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  successBox: {
    backgroundColor: "#DCFCE7",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },

  successText: {
    color: "#166534",
    textAlign: "center",
    fontWeight: "600",
  },
});