import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { web3 } from "@project-serum/anchor";
import { useWalletInitializer } from "../useWorkspace";

const Home = () => {
  const textarea = useRef(null);
  const topic = useRef(null);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const { wallet, program } = useWalletInitializer();

  useEffect(() => {
    const fetchTweets = async () => {

      const tweetsData = await program.account.tweet.all();
      const extractedTweets: TweetType[] = tweetsData.map((tweet) => ({
        author_display: tweet.account.author.toString(),
        created_ago: tweet.account.timestamp.toString(),
        topic: tweet.account.topic.toString(),
        content: tweet.account.content.toString(),
      }));

      setTweets(extractedTweets);
    };
    fetchTweets();
  }, []);

  const handleInputChange = () => {
    const inputText = textarea.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
  };

  const sendtweet = async () => {
    if (topic.current.value && textarea.current.value) {
      const tweet = web3.Keypair.generate();

      await program.rpc.sendTweet(topic.current.value, textarea.current.value, {
        accounts: {
          author: wallet.publicKey,
          tweet: tweet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet],
      });

      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      console.log(tweetAccount);
      topic.current.value = "";
      textarea.current.value = "";
      setLeftCharacters(280);
    }
  };

  return (
    <div className="flex flex-col items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">Home</p>
      {wallet.connected ? (
        [
          <textarea
            rows={1}
            ref={textarea}
            className="text-xl w-[650px] focus:outline-none resize-none p-2 mx-8 my-3"
            placeholder="What's happening?"
            onChange={handleInputChange}
          />,
          <span className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
            <input
              ref={topic}
              type="text"
              placeholder="# topic"
              className="text-pink-500 rounded-full p-2 bg-gray bg-gray-100"
              
            />
            <span className="flex items-center gap-5">
              <p>{leftCharacters} left</p>
              <button
                className={`${
                  topic.current?.value && textarea.current?.value
                    ? "bg-babyBlue"
                    : "bg-darkGray hover:cursor-not-allowed"
                } px-4 py-2 rounded-2xl font-bold text-secondary`}
                onClick={sendtweet}
              >
                Tweet
              </button>
            </span>
          </span>,
        ]
      ) : (
        <p className=" bg-gray border-b border-gray p-4 w-full items-center flex justify-center text-darkGray">
          Connect your wallet to start tweeting...{" "}
        </p>
      )}
      {tweets.map((tweet) => (
        <Tweet tweet={tweet} />
      ))}
    </div>
  );
};

export default Home;
