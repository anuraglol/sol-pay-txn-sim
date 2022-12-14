import "@/styles/fonts.css";
import { theme } from "@/theme";
import WalletContextProvider from "@/utils/contexts/WalletContext";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/dm-mono";
import "@fontsource/dm-mono/500.css";
import "@fontsource/manrope";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </WalletContextProvider>
  );
}

export default MyApp;
