import { createContext, FunctionComponent, useCallback, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";
import { recoverUserInformation, signInRequest } from "../services/auth";

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

const A_DAY_IN_SECONDS = 86400;

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const { nextauth_token: token } = parseCookies();

    if (token) {
      recoverUserInformation({ token }).then((response) => setUser(response.user));
      router.push("/dashboard");
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInData) => {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    if (!user) {
      throw new Error("User not authenticated.");
    }

    setCookie(undefined, "nextauth_token", token, {
      maxAge: A_DAY_IN_SECONDS,
    });

    setUser(user);
    setIsAuthenticated(!!user);
    router.push("/dashboard");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
