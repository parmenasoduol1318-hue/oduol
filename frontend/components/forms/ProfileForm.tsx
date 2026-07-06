// components/forms/ProfileForm.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";

import { useAuthStore } from "../../store/authStore";

export default function ProfileForm() {
  const {
    user,
    updateProfile,
  } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(
        user.full_name ||
          user.name ||
          ""
      );

      setEmail(user.email || "");

      setPhoneNumber(
        user.phone_number || ""
      );
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProfile({
        full_name: fullName.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim(),
      });

      Alert.alert(
        "Success",
        "Your profile has been updated."
      );
    } catch (err: any) {
      Alert.alert(
        "Update Failed",
        err?.message ||
          "Unable to update your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatar = () => {
    Alert.alert(
      "Coming Soon",
      "Profile picture upload will be available in a future update."
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={handleAvatar}
      >
        {user?.profile_picture ? (
          <Image
            source={{
              uri: user.profile_picture,
            }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons
              name="person"
              size={42}
              color="#FFFFFF"
            />
          </View>
        )}

        <View style={styles.cameraBadge}>
          <Ionicons
            name="camera"
            size={18}
            color="#FFFFFF"
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.changePhoto}>
        Tap to change photo
      </Text>

      <AppInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full name"
        icon="person-outline"
      />

      <AppInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email address"
        icon="mail-outline"
      />

      <AppInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="07XXXXXXXX"
        icon="call-outline"
      />

      <AppButton
        title="Save Changes"
        icon="save-outline"
        loading={loading}
        onPress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  avatarContainer: {
    alignSelf: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraBadge: {
    position: "absolute",
    right: 4,
    bottom: 4,
    backgroundColor: Colors.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  changePhoto: {
    textAlign: "center",
    marginBottom: 28,
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});