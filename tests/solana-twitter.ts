import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaTwitter } from "../target/types/solana_twitter";
import * as assert from "assert";
import { PublicKey } from "@solana/web3.js";

describe("solana-twitter", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaTwitter as Program<SolanaTwitter>;

  // it("can send a new tweet", async () => {
  //   const tweet = anchor.web3.Keypair.generate();
  //   await program.rpc.sendTweet("veganism", "Hummus, am I right?", {
  //     accounts: {
  //       tweet: tweet.publicKey,
  //       author: anchor.AnchorProvider.env().wallet.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [tweet],
  //   });
  //   const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  //   assert.equal(
  //     tweetAccount.author.toBase58(),
  //     anchor.AnchorProvider.env().wallet.publicKey.toBase58()
  //   );

  //   console.log(tweetAccount);
  // });

  // it("can send a new tweet from a different author", async () => {
  //   const otherUser = anchor.web3.Keypair.generate();
  //   const signature = await program.provider.connection.requestAirdrop(
  //     otherUser.publicKey,
  //     1000000000
  //   );
  //   await program.provider.connection.confirmTransaction(signature);

  //   const tweet = anchor.web3.Keypair.generate();
  //   await program.rpc.sendTweet("veganism", "Yay Tofu!", {
  //     accounts: {
  //       tweet: tweet.publicKey,
  //       author: otherUser.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [otherUser, tweet],
  //   });

  //   const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

  //   console.log(tweetAccount);
  // });

  it("can fetch all tweets", async () => {
    const tweetAccounts = await program.account.tweet.all();
    console.log(tweetAccounts)
  });

  // it("can edit a tweet", async () => {
  //   const tweetId = new PublicKey(
  //     "HSU4y95CfAtBgrvCH1XUSJewUgAacK5BkykwXvjUPHC"
  //   );
  //   console.log(tweetId);
  //   const newContent = "update content22";
  //   const newTopic = "new Topic222";
  //   await program.rpc.updateTweet(tweetId, newContent, newTopic, {
  //     accounts: {
  //       tweet: tweetId,
  //       author: anchor.AnchorProvider.env().wallet.publicKey,
  //     },
  //   });

  //   const tweetAccount = await program.account.tweet.fetch(tweetId);
  //   console.log(tweetAccount);
  // });

  // it("can delete a tweet", async () => {
  //   const tweetIdToDelete = new PublicKey(
  //     "HSU4y95CfAtBgrvCH1XUSJewUgAacK5BkykwXvjUPHC"
  //   );
  //   await program.rpc.deleteTweet(tweetIdToDelete, {
  //     accounts: {
  //       tweet: tweetIdToDelete,
  //       author: anchor.AnchorProvider.env().wallet.publicKey,
  //     },
  //   });
  //   const tweetAccount = await program.account.tweet.fetch(tweetIdToDelete);
  //   console.log(tweetAccount);
  // });
});
