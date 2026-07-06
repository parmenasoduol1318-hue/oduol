// frontend/app/subscription/history.tsx

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

interface PaymentHistory {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending" | "Failed";
}

const history: PaymentHistory[] = [
  {
    id: "1",
    date: "28 Jun 2026",
    amount: "KSh 499",
    method: "M-Pesa",
    status: "Completed",
  },
  {
    id: "2",
    date: "28 May 2026",
    amount: "KSh 499",
    method: "PayPal",
    status: "Completed",
  },
  {
    id: "3",
    date: "28 Apr 2026",
    amount: "KSh 499",
    method: "M-Pesa",
    status: "Failed",
  },
];

export default function SubscriptionHistoryScreen() {
  const getStatusColor = (status: PaymentHistory["status"]) => {
    switch (status) {
      case "Completed":
        return "#16A34A";
      case "Pending":
        return "#F59E0B";
      case "Failed":
        return "#DC2626";
      default:
        return Colors.primary;
    }
  };

  const renderItem = ({ item }: { item: PaymentHistory }) => (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.amount}>{item.amount}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Ionicons
          name={
            item.method === "PayPal"
              ? "logo-paypal"
              : "phone-portrait"
          }
          size={18}
          color={Colors.primary}
        />

        <Text style={styles.method}>{item.method}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Payment History
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="receipt-outline"
              size={80}
              color={Colors.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              No Payments Yet
            </Text>

            <Text style={styles.emptySubtitle}>
              Your completed payments will appear here.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  list: {
    padding: 18,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  date: {
    marginTop: 5,
    color: Colors.textSecondary,
    fontSize: 14,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  method: {
    marginLeft: 8,
    color: Colors.text,
    fontSize: 15,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
  },

  statusText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  emptySubtitle: {
    marginTop: 8,
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 15,
    paddingHorizontal: 30,
  },
});