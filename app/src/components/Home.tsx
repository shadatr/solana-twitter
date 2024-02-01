import React, { useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";

const tweet = {
  author_display: "4qrdZfhnSkwE6DFcQKA1ecAydAS159UqvhBLgUYKaYWX",
  created_ago: "4 months",
  content:
    "Try Purebet: https://purebet.io, highest odds, self custody, USDC betting",
  topic: "sports-betting",
};

const Home = () => {
  const textarea = useRef(null);
  const topic = useRef(null);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets]= useState<TweetType[]>([])

  const handleInputChange = () => {
    const inputText = topic.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280-numberOfCharacters)
    console.log("Number of characters:", numberOfCharacters);
  };

  return (
    <div className="flex flex-col gap-5 items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">Home</p>
      <textarea
        rows={1}
        ref={textarea}
        className="text-xl w-[650px] focus:outline-none resize-none p-2 mx-8"
        placeholder="What's happening?"
        v-model="content"
      />
      <span className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
        <input
          ref={topic}
          type="text"
          placeholder="# topic"
          className="text-pink-500 rounded-full p-2 bg-gray bg-gray-100"
          onChange={handleInputChange}
        />
        <span className="flex items-center gap-5">
        <p>{leftCharacters} left</p>
        <button className="bg-babyBlue px-4 py-2 rounded-2xl font-bold text-secondary">Tweet</button>
        </span>
      </span >
      {tweets.map((tweet)=>
        <Tweet tweet={tweet} />
      )}
    </div>
  );
};

export default Home;
