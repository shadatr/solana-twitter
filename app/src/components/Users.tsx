import React, { useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate, useParams } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(userId);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    navigate(`/users/${user}`);
    setSearch(true)
  }

  return (
    <div className="flex flex-col  items-start w-[700px] border-l border-r border-gray">
      <p className=" border-b border-gray p-4 text-md font-bold w-full">
        Users
      </p>
      <div className="relative w-full">
        <input
          className="text-gray-700 w-full pl-10 pr-32 py-4 bg-gray"
          placeholder="Public key"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
