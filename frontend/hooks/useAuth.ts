import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const user = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.user);
  const authenticated = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.authenticated);
  const loading = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.loading);
  const login = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.login);
  const register = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.register);
  const logout = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.logout);
  const initialize = useAuthStore((state: ReturnType<typeof useAuthStore.getState>) => state.initialize);

  return {
    user,
    authenticated,
    loading,
    login,
    register,
    logout,
    initialize,
  };
};

export default useAuth;
