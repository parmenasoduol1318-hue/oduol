// frontend/app/subscription/manage.tsx

import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

export default function ManageSubscriptionScreen() {
  const [autoRenew, setAutoRenew] = useState(true);

  const cancelSubscription = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your SwiftReply Pro subscription?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Subscription Cancelled",
              "Your subscription will remain active until the end of your billing period."
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Manage Subscription
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Current Plan */}

        <View style={styles.card}>
          <View style={styles.planRow}>
            <Ionicons
              name="diamond"
              size={40}
              color="#F59E0B"
            />

            <View style={{ marginLeft: 15 }}>
              <Text style={styles.planTitle}>
                SwiftReply Pro
              </Text>

              <Text style={styles.planSubtitle}>
                Active Monthly Subscription
              </Text>
            </View>
          </View>
        </View>

        {/* Subscription Info */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Subscription Details
          </Text>

          <View style={styles.item}>
            <Text style={styles.label}>
              Plan
            </Text>

            <Text style={styles.value}>
              Pro Monthly
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text style={styles.label}>
              Price
            </Text>

            <Text style={styles.value}>
              KSh 499 / Month
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text style={styles.label}>
              Renewal Date
            </Text>

            <Text style={styles.value}>
              28 July 2026
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text style={styles.label}>
              Payment Method
            </Text>

            <Text style={styles.value}>
              M-Pesa
            </Text>
          </View>
        </View>

        {/* Auto Renew */}

        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>
                Auto Renewal
              </Text>

              <Text style={styles.description}>
                Automatically renew your subscription every billing cycle.
              </Text>
            </View>

            <Switch
              value={autoRenew}
              onValueChange={setAutoRenew}
              trackColor={{
                false: "#ccc",
                true: Colors.primary,
              }}
            />
          </View>
        </View>

        {/* Actions */}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            router.push("/subscription/history")
          }
        >
          <Ionicons
            name="receipt-outline"
            size={20}
            color="#fff"
          />

          <Text style={styles.primaryButtonText}>
            View Payment History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            router.push("/subscription/upgrade")
          }
        >
          <Ionicons
            name="rocket-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.secondaryButtonText}>
            Change Plan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelSubscription}
        >
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="#EF4444"
          />

          <Text style={styles.cancelButtonText}>
            Cancel Subscription
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  planRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  planTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  planSubtitle: {
    marginTop: 4,
    color: Colors.textSecondary,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 10,
  },

  description: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  label: {
    color: Colors.textSecondary,
    fontSize: 15,
  },

  value: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 15,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },

  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  cancelButtonText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
});