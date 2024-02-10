import React, { useRef, useState } from "react";
import { TweetType } from "../Types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useWalletInitializer } from "../useWorkspace";
import toast from "react-hot-toast";
import { web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const DropdownComp = ({
  onEditClick,
  onDeleteClick,
}: {
  onEditClick: () => void;
  onDeleteClick: () => void;
}) => {
  return (
    <Dropdown className="bg-black">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="faded"
          aria-label="Take a photo"
          className="font-black"
        >
          :
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        color="primary"
        variant="shadow"
      >
        <DropdownItem
          key="edit"
          className="text-secondary"
          onClick={onEditClick}
        >
          Edit Tweet
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={onDeleteClick}
        >
          Delete Tweet
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const TweetComponent = ({ tweet }: { tweet: TweetType }) => {
  const [edit, setEdit] = useState(false);
  const [delet, setDelete] = useState(false);
  const [content, setContent] = useState(tweet.content);
  const [topic, setTopic] = useState(tweet.topic);
  const [leftCharacters, setLeftCharacters] = useState(280);
  const { program, wallet } = useWalletInitializer();

  const handleInputChange = () => {
    const inputText = content;
    const numberOfCharacters = inputText.length;
    setLeftCharacters(280 - numberOfCharacters);
  };

  const truncatedAuthor =
    tweet.author_display.slice(0, 4) + "..." + tweet.author_display.slice(-4);

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleDeleteClick = async () => {
    try{
      const tweetPublicKey = new PublicKey(tweet.publicKey);
      await program.rpc.deleteTweet({
        accounts: {
          tweet: tweetPublicKey,
          author: wallet.publicKey,
        },
      });
      toast.success("The tweet has been deleted successfully");
    }catch(err){
      toast.error("Error Occurred");
    }
  };

  const handleSave = async () => {
    try {
      const tweetPublicKey = new PublicKey(tweet.publicKey);
      await program.rpc.updateTweet(tweetPublicKey, content, topic, {
        accounts: {
          tweet: tweetPublicKey,
          author: wallet.publicKey,
        },
      });
      toast.success("The tweet has been edited successfully");
      setEdit(false);
    } catch (err) {
      console.log(err);
      toast.error("Error Occurred");
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[700px] px-8 py-4 border-b border-gray">
      <div className="flex justify-between items-center">
        <span className="flex gap-3">
          <Link to={`/users/${tweet.author_display}`} className="font-black">
            {truncatedAuthor}
          </Link>
          <p className="text-darkGray">
            {dayjs.unix(parseInt(tweet.created_ago)).fromNow()}
          </p>
        </span>
        {wallet?.publicKey?.toBase58() == tweet.author_display && (
          <DropdownComp
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        )}
      </div>
      {edit ? (
        <>
          <textarea
            className=" w-full focus:outline-none resize-none bg-black"
            value={content}
            onChange={(e) => {
              handleInputChange(), setContent(e.target.value);
            }}
          />
          <span key={2} className="flex items-center justify-between w-full  ">
            <input
              onChange={(e) => {
                handleInputChange(), setTopic(e.target.value);
              }}
              type="text"
              value={topic}
              className="text-babyBlue rounded-full focus:outline-babyBlue py-1 px-2 bg-gray bg-gray-100"
            />
            <span key={3} className="flex items-center gap-5">
              <p>{leftCharacters} left</p>
              <Button
                className={`${
                  topic && content
                    ? "bg-babyBlue"
                    : "bg-darkGray hover:cursor-not-allowed"
                } px-4 py-2 rounded-2xl font-bold text-secondary`}
                onClick={handleSave}
                size="sm"
              >
                Save
              </Button>
            </span>
          </span>
        </>
      ) : (
        <>
          <span>{content}</span>
          <Link
            to={`/topics/${topic}`}
            className="hover:underline text-babyBlue"
          >
            #{topic}
          </Link>
        </>
      )}
    </div>
  );
};

export default TweetComponent;
