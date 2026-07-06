// components/forms/ContactForm.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

import AppInput from "../common/AppInput";
import AppButton from "../common/AppButton";
import Colors from "../../constants/colors";
import client from "../../services/api/client";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    if (!subject.trim()) {
      setError("Subject is required.");
      return false;
    }

    if (!message.trim()) {
      setError("Message is required.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await client.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      setSuccess(
        "Your message has been sent successfully."
      );

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Unable to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppInput
        label="Name"
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        icon="person-outline"
        required
      />

      <AppInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        icon="mail-outline"
        required
      />

      <AppInput
        label="Subject"
        placeholder="Message subject"
        value={subject}
        onChangeText={setSubject}
        icon="document-text-outline"
        required
      />

      <AppInput
        label="Message"
        placeholder="Write your message..."
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        style={styles.messageInput}
        required
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {success ? (
        <Text style={styles.success}>{success}</Text>
      ) : null}

      <AppButton
        title="Send Message"
        icon="send-outline"
        loading={loading}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  messageInput: {
    minHeight: 120,
    paddingTop: 14,
  },

  error: {
    color: "#DC2626",
    marginBottom: 15,
    fontSize: 14,
  },

  success: {
    color: "#16A34A",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "600",
  },
});