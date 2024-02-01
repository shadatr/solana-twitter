import React, { useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";


const Users = () => {
  const textarea = useRef(null);
  const topic = useRef(null);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(true)
  }

  const handleInputChange = () => {
    const inputText = topic.current.value;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
    console.log("Number of characters:", numberOfCharacters);
  };

  return (
    <div className="flex flex-col  items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">
        Users
      </p>
      <div className="relative w-full">
        <input
          className="text-gray-700 w-full pl-10 pr-32 py-4 bg-gray"
          placeholder="Public key"
        />
        <div className="absolute right-0 inset-y-0 flex items-center pr-8">
          <button className="bg-darkGray px-4 py-2 rounded-2xl font-bold text-secondary" onClick={handleSearch}>Search</button>
        </div>
      </div>
      {search&& 
      <div>
      
      {tweets.map((tweet) => (
        <Tweet tweet={tweet} />
      ))}
        </div>}
    </div>
  );
};

export default Users;
