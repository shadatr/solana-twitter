import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {PhantomWalletAdapter,SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";
import {WalletProvider,ConnectionProvider} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Buffer } from 'buffer';
import {NextUIProvider} from '@nextui-org/react'

global.Buffer = Buffer;

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

const rootElement = document.getElementById("root");
console.log(import.meta.env.VITE_CLUSTER_URL)
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <NextUIProvider>
      <ConnectionProvider endpoint={import.meta.env.VITE_CLUSTER_URL}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <main className="dark text-foreground bg-background">
            <App />
            </main>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found");
}

