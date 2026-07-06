// frontend/hooks/usePermissions.ts

import { useEffect, useState } from "react";
import { getCache, setCache } from "../lib/cache";
import { STORAGE_KEYS, ROLES } from "../lib/constants";

export type Permission = "read" | "write" | "delete" | "admin";

export type UserRole = "user" | "admin";

export type UserPermissions = {
  role: UserRole;
  permissions: Permission[];
};

/**
 * Default permissions mapping
 */
const rolePermissions: Record<UserRole, Permission[]> = {
  user: ["read", "write"],
  admin: ["read", "write", "delete", "admin"],
};

/**
 * Hook to manage user permissions
 */
export function usePermissions() {
  const [role, setRole] = useState<UserRole>("user");
  const [permissions, setPermissions] = useState<Permission[]>(["read"]);

  const [loaded, setLoaded] = useState(false);

  /**
   * Load permissions from cache
   */
  useEffect(() => {
    const user = getCache<any>(STORAGE_KEYS.USER);

    if (user?.role) {
      const userRole = user.role as UserRole;

      setRole(userRole);
      setPermissions(rolePermissions[userRole] || ["read"]);
    }

    setLoaded(true);
  }, []);

  /**
   * Check permission
   */
  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  /**
   * Check role
   */
  const hasRole = (checkRole: UserRole): boolean => {
    return role === checkRole;
  };

  /**
   * Refresh permissions (useful after login/update)
   */
  const refreshPermissions = () => {
    const user = getCache<any>(STORAGE_KEYS.USER);

    if (user?.role) {
      const userRole = user.role as UserRole;

      setRole(userRole);
      setPermissions(rolePermissions[userRole] || ["read"]);
    }
  };

  /**
   * Manually set role (admin override or testing)
   */
  const setUserRole = (newRole: UserRole) => {
    setRole(newRole);
    setPermissions(rolePermissions[newRole]);
  };

  return {
    role,
    permissions,
    loaded,
    hasPermission,
    hasRole,
    refreshPermissions,
    setUserRole,
  };
}