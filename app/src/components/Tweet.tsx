import React from "react";
import { TweetType } from "../Types";
import { Link } from "react-router-dom";

const TweetComponent = ({ tweet }: { tweet: TweetType }) => {
  const truncatedAuthor =
    tweet.author_display.slice(0, 4) +
    "..." +
    tweet.author_display.slice(-4);
  return (
    <div className="flex flex-col gap-2 w-[700px] px-8 py-4 border-b border-gray">
      <span className="flex gap-3">
        <p className="font-black">{truncatedAuthor}</p>
        <p className="text-darkGray">{tweet.created_ago}</p>
      </span>
      <span>{tweet.content}{tweet.content}</span>
      <Link to={`/topics/${tweet.topic}`} className="hover:underline text-babyBlue">#{tweet.topic}</Link>
    </div>
  );
};

export default TweetComponent;
