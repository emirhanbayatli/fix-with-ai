export type UserType = {
  fullName: string;
  email: string | null;
  id: string | null;
  type?: AuthProviderType;
  status: string;
} | null;

export type AuthProviderType = "google" | "emailPassword";

export type AuthContextType = {
  user: UserType;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};
