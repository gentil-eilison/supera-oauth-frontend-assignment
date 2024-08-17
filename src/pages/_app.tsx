import type { AppProps } from "next/app";
import "@/styles/global.scss";
import { UserContextProvider } from "@/context/UserContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
