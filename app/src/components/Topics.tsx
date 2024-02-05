import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams, useNavigate } from "react-router-dom";
import bs58 from 'bs58'
import { useWalletInitializer } from "../useWorkspace";
import { web3 } from "@project-serum/anchor";
import { Button } from "@nextui-org/react";

const Topics = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const textarea = useRef(null);
  const [topic, setTopic] = useState(topicId);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [search, setSearch] = useState(topic ? true : false);
  const { connected } = useWallet();
  const { program, wallet } = useWalletInitializer();

  useEffect(()=>{
    if(topicId){
      handleSearch()
    }
  },[])

  const handleSearch = async () => {
    navigate(`/topics/${topic}`);
    setSearch(true);

    const authorFilter = (topic) => ({
      memcmp: {
        offset:  8 + 32 + 8 + 4,
        bytes: bs58.encode(Buffer.from(topic)),
      },
    });

    try {
      const tweetsData = await program.account.tweet.all([authorFilter(topic)]);
      const userTweets = tweetsData
        .filter((tweet) => tweet.account.topic.toString() === topic&& tweet.account.content.toString()!="")
        .map((tweet) => ({
          author_display: tweet.account.author.toString(),
          created_ago: tweet.account.timestamp.toString(),
          topic: tweet.account.topic.toString(),
          content: tweet.account.content.toString(),
        }));

      setTweets(userTweets);
      console.log(userTweets)
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const handleInputChange = () => {
    const inputText = textarea.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
  };

  const sendtweet = async () => {
    if (topic && textarea.current.value) {
      const tweet = web3.Keypair.generate();

      await program.rpc.sendTweet(topic, textarea.current.value, {
        accounts: {
          author: wallet.publicKey,
          tweet: tweet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet],
      });

      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      console.log(tweetAccount);
      setTopic("");
      textarea.current.value = "";
      setLeftCharacters(280);
    }
    handleSearch()
  };

  return (
    <div className="flex flex-col  items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">
        Topics
      </p>
      <div className="relative w-full">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="text-gray-700 w-full pl-10 pr-32 py-4 bg-gray"
          placeholder="# Topic"
        />
        <div className="absolute right-0 inset-y-0 flex items-center pr-8">
          <Button
            className="bg-darkGray px-4 py-2 rounded-2xl font-bold text-secondary"
            onClick={handleSearch}
          >
            Search
          </Button>
          
        </div>
      </div>
      {search && (
        <div className="w-full">
          {connected ? (
            [
              <textarea
                rows={1}
                ref={textarea}
                className="text-xl w-[650px] focus:outline-none resize-none p-2 mx-8 my-3 bg-black"
                placeholder="What's happening?"
                v-model="content"
                onChange={handleInputChange}
              />,
              <span className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
                <p className="text-babyBlue rounded-full p-3 bg-gray bg-gray-100">
                  # {topicId}
                </p>
                <span className="flex items-center gap-5">
                  <p>{leftCharacters} left</p>
                  <Button
                className={`${
                 (topic && textarea.current?.value)
                    ? "bg-babyBlue"
                    : "bg-darkGray hover:cursor-not-allowed"
                } px-4 py-2 rounded-2xl font-bold text-secondary`}
                onClick={sendtweet}
              >
                Tweet
              </Button>
                </span>
              </span>,
            ]
          ) : (
            <p className=" bg-gray border-b border-t border-gray p-4 w-full items-center flex justify-center text-darkGray">
              Connect your wallet to start tweeting...{" "}
            </p>
          )}
          {tweets.length !== 0 ? (
            tweets.map((tweet, index) => <Tweet tweet={tweet} key={index} />)
          ) : (
            <div className="w-[700px] text-md font-bold items-center justify-center flex py-10 text-darkGray">
              No tweets were found in this topic...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Topics;
