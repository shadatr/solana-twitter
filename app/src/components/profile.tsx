import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { useWalletInitializer } from "../useWorkspace";
import { web3 } from "@project-serum/anchor";

const Profile = () => {
  const textarea = useRef(null);
  const topic = useRef(null);
  const [refresh, setRefresh]= useState(false)
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const {wallet,program}= useWalletInitializer();
  const user=wallet?.publicKey?.toBase58();

  useEffect(()=>{
    const fetchTweets =async ()=>{
      const authorFilter = (user) => ({
        memcmp: {
          offset: 8,
          bytes: user,
        },
      });
  
      try {
        const tweetsData = await program.account.tweet.all([authorFilter(user)]);
        const userTweets = tweetsData
          .filter((tweet) => tweet.account.author.toString() === user)
          .map((tweet) => ({
            author_display: tweet.account.author.toString(),
            created_ago: tweet.account.timestamp.toString(),
            topic: tweet.account.topic.toString(),
            content: tweet.account.content.toString(),
          }));
  
        setTweets(userTweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    }
    fetchTweets();
  },[refresh])

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
    setRefresh(!refresh)
  };

  return (
    <div className="flex flex-col  items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">
        Topics
      </p>
      <div className="relative w-full">
        <p className="text-gray-700 w-full pl-10 pr-32 py-4 bg-gray">
          { wallet?.publicKey?.toBase58() }
        </p>
      </div>
      <div>
        <textarea
          rows={1}
          ref={textarea}
          className="text-xl w-[650px] focus:outline-none resize-none p-2 mx-8 my-3"
          placeholder="What's happening?"
          v-model="content"
          onChange={handleInputChange}
        />
        <span className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
          <input
            ref={topic}
            type="text"
            placeholder="# topic"
            className="text-pink-500 rounded-full p-2 bg-gray bg-gray-100"
          />
          <span className="flex items-center gap-5">
            <p>{leftCharacters} left</p>
            <button className="bg-babyBlue px-4 py-2 rounded-2xl font-bold text-secondary" onClick={sendtweet}>
              Tweet
            </button>
          </span>
        </span>
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
