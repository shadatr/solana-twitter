import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Commitment } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "./idl/solana_twitter.json";
import { SolanaTwitter } from "./idl/solana_twitter";
const opts = {
  preflightCommitment: "processed" as Commitment,
};
const programID = new PublicKey(idl.metadata.address);
export const useWalletInitializer = () => {

  const wallet = useWallet();
  const network = import.meta.env.VITE_CLUSTER_URL;
  const Idl:SolanaTwitter=idl;
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new AnchorProvider(connection, wallet, opts);

  const program = new Program(Idl, programID, provider);

  return { wallet, provider, connection, program };
};
