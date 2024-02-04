import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {PhantomWalletAdapter,SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";
import {WalletProvider,ConnectionProvider} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

const rootElement = document.getElementById("root");
console.log(import.meta.env.VITE_CLUSTER_URL)
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ConnectionProvider endpoint={import.meta.env.VITE_CLUSTER_URL}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <App />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found");
}

