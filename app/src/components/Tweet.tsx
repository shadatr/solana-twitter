import React from "react";
import { TweetType } from "../Types";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)


const DropdownComp=()=> {
  return (
    <Dropdown className="bg-black" >
      <DropdownTrigger>
      <Button isIconOnly variant="faded" aria-label="Take a photo" className="font-black">
          :
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" color="primary" variant="shadow">
        <DropdownItem key="edit" className="text-secondary">Edit Tweet</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete Tweet
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}



const TweetComponent = ({ tweet }: { tweet: TweetType }) => {
  const truncatedAuthor =
    tweet.author_display.slice(0, 4) +
    "..." +
    tweet.author_display.slice(-4);
  return (
    <div className="flex flex-col gap-2 w-[700px] px-8 py-4 border-b border-gray">
      <div className="flex justify-between items-center">
      <span className="flex gap-3">
        <Link to={`/users/${tweet.author_display}`} className="font-black">{truncatedAuthor}</Link>
        <p className="text-darkGray">{dayjs.unix(parseInt(tweet.created_ago)).fromNow()}</p>
      </span>
      <DropdownComp/>
      </div>
      <span>{tweet.content}</span>
      <Link to={`/topics/${tweet.topic}`} className="hover:underline text-babyBlue">#{tweet.topic}</Link>
    </div>
  );
};

export default TweetComponent;
