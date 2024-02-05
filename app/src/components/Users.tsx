import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import { TweetType } from "../Types";
import { useNavigate, useParams } from "react-router-dom";
import { useWalletInitializer } from "../useWorkspace";
import { Button } from "@nextui-org/react";

const Users = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(userId);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [search, setSearch] = useState(false);
  const { program } = useWalletInitializer();

  useEffect(()=>{
    if(userId){
      handleSearch()
    }
  },[])
  
  const handleSearch = async () => {
    navigate(`/users/${user}`);
    setSearch(true);

    const authorFilter = (user) => ({
      memcmp: {
        offset: 8,
        bytes: user,
      },
    });

    try {
      const tweetsData = await program.account.tweet.all([authorFilter(user)]);
      const userTweets = tweetsData
        .filter((tweet) => tweet.account.author.toString() === user && tweet.account.content.toString()!="")
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
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
        <div>
          {tweets.length !== 0 ? (
            tweets.map((tweet, index) => <Tweet tweet={tweet} key={index} />)
          ) : (
            <div className="w-[700px] text-md font-bold items-center justify-center flex py-10 text-darkGray">
              User not found...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
