import React, { useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { useWallet } from "@solana/wallet-adapter-react";
import { useParams, useNavigate } from "react-router-dom";

const Topics = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const textarea = useRef(null);
  const [topic, setTopic] = useState(topicId);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [search, setSearch] = useState(topic ? true : false);
  const { connected } = useWallet();

  const handleSearch = () => {
    navigate(`/topics/${topic}`);
    setSearch(true);
  };

  const handleInputChange = () => {
    const inputText = textarea.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
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
          <button
            className="bg-darkGray px-4 py-2 rounded-2xl font-bold text-secondary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {search && (
        <div className="w-full">
          {connected ? (
            [
              <textarea
                rows={1}
                ref={textarea}
                className="text-xl w-[650px] focus:outline-none resize-none p-2 mx-8 my-3"
                placeholder="What's happening?"
                v-model="content"
                onChange={handleInputChange}
              />,
              <span className="flex items-center justify-between w-full border-b border-gray pb-5 px-8">
                <p className="text-pink-500 rounded-full p-3 bg-gray bg-gray-100">
                  # {topicId}
                </p>
                <span className="flex items-center gap-5">
                  <p>{leftCharacters} left</p>
                  <button className="bg-babyBlue px-4 py-2 rounded-2xl font-bold text-secondary">
                    Tweet
                  </button>
                </span>
              </span>,
            ]
          ) : (
            <p className=" bg-gray border-b border-t border-gray p-4 w-full items-center flex justify-center text-darkGray">
              Connect your wallet to start tweeting...{" "}
            </p>
          )}
          {tweets.map((tweet) => (
            <Tweet tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Topics;
