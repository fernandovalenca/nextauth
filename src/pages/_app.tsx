import { AppProps } from "next/dist/next-server/lib/router/router";
import { AuthProvider } from "../context/AuthContext";

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
