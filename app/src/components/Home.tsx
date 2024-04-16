import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { web3 } from "@project-serum/anchor";
import { useWalletInitializer } from "../useWorkspace";
import { Button, Skeleton } from "@nextui-org/react";
import { toast } from "react-hot-toast";

const Home = () => {
  const textarea = useRef(null);
  const topic = useRef(null);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const { wallet, program } = useWalletInitializer();
  const [refresh, setRefresh]= useState(false)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {

      const tweetsData = await program.account.tweet.all();
      const extractedTweets: TweetType[] = tweetsData.filter((tweet) => tweet.account.content.toString()!="")
      .map((tweet) => ({
        publicKey: tweet.publicKey.toString(),
        author_display: tweet.account.author.toString(),
        created_ago: tweet.account.timestamp.toString(),
        topic: tweet.account.topic.toString(),
        content: tweet.account.content.toString(),
      }));

      setTweets(extractedTweets);
      setLoaded(true)
    };
    fetchTweets();
    
  }, [refresh]);

  const handleInputChange = () => {
    const inputText = textarea.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
  };

  const sendtweet = async () => {
    try{
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
  
        topic.current.value = "";
        textarea.current.value = "";
        toast.success("The tweet has been sended successfully");
        setLeftCharacters(280);
      }
      setRefresh(!refresh)
    }catch(err){
      toast.error("Error Occurred");
    }
  };

  return (
    <div className="flex flex-col items-start lg:w-[700px] sm:w-[350px]  border-l border-r border-gray lg:text-sm sm:text-xxsm">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">Home</p>
      {!wallet.connected ? (
        [
          <textarea
          key={1}
            rows={1}
            ref={textarea}
            className="lg:text-xl sm:text-sm lg:w-[650px] sm:w-[300px] focus:outline-none resize-none p-2 mx-8 my-3 bg-black"
            placeholder="What's happening?"
            onChange={handleInputChange}
          />,
          <span key={2} className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
            <input
              ref={topic}
              type="text"
              placeholder="# topic"
              className="text-babyBlue rounded-full focus:outline-babyBlue py-2 px-4 bg-gray bg-gray-100"
            />
            <span key={3} className="flex items-center gap-5">
              <p>{leftCharacters} left</p>
              <Button
                className={`${
                 (topic.current?.value && textarea.current?.value)
                    ? "bg-babyBlue"
                    : "bg-darkGray hover:cursor-not-allowed"
                } lg:px-4 lg:py-2 sm:px-3 sm:py-1 rounded-2xl font-bold text-secondary lg:text-sm sm:text-xxsm`}
                onClick={sendtweet}
              >
                Tweet
              </Button>
            </span>
          </span>,
        ]
      ) : (
        <p className=" bg-gray border-b border-gray p-4 w-full items-center flex justify-center text-darkGray">
          Connect your wallet to start tweeting...{" "}
        </p>
      )}
      {loaded==true ? (
          tweets.length > 0 ? (
            tweets.map((tweet) => <Tweet tweet={tweet} />)
          ) : (
            <div className="lg:w-[700px] sm:w-[350px] text-md font-bold items-center justify-center flex py-10 text-darkGray">
              No tweets were found here...
            </div>
          )
        ) : ( 
          <div>
            <div className="lg:w-[700px] sm:w-[350px] flex flex-col gap-2 p-6">
              <Skeleton className="h-5 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              <Skeleton className="h-5 w-1/6 rounded-lg" />
            </div>
            <div className=" border-b border-gray lg:w-[700px] sm:w-[350px]"/>
            <div className="w-full flex flex-col gap-2 p-6">
              <Skeleton className="h-5 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              <Skeleton className="h-5 w-1/6 rounded-lg" />
            </div>
            <div className=" border-b border-gray lg:w-[700px] sm:w-[350px]"/>
            <div className="w-full flex flex-col gap-2 p-6">
              <Skeleton className="h-5 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-4/5 rounded-lg" />
              <Skeleton className="h-5 w-1/6 rounded-lg" />
            </div>
            <div className=" border-b border-gray lg:w-[700px] sm:w-[350px]"/>
          </div>
        )}
    </div>
  );
};

export default Home;
