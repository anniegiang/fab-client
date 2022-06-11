import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import ArtistController from "Controllers/ArtistController";
import {ArtistMessageResponse, Message} from "Types/message";
import {yesNo} from "Constants/common";
import {YesNo} from "Types/coreTypes";

type Props = {
  messages: Message[];
};

const tabs = {
  [yesNo.no]: "Read messages",
  [yesNo.yes]: "Unread messages"
};

export default ({messages}: Props) => {
  const [seeRead, setSeeRead] = useState<YesNo | undefined>(yesNo.yes);

  const handleClick = (all?: boolean) => {
    if (all === true) setSeeRead(undefined);
    if (all === false) setSeeRead(yesNo.yes);

    if (seeRead === yesNo.yes) {
      setSeeRead(yesNo.no);
    } else {
      setSeeRead(yesNo.yes);
    }
  };

  const readMessages = messages.filter((m) => m.isRead === yesNo.yes);
  const unReadMessages = messages.filter((m) => m.isRead === yesNo.no);

  const _messages =
    seeRead === yesNo.yes
      ? readMessages
      : seeRead === undefined
      ? messages
      : unReadMessages;

  return (
    <div>
      <button onClick={() => handleClick(true)}>See all</button>
      <button onClick={handleClick}>{tabs[seeRead]}</button>
      <ul>
        {_messages.map((m: Message) => {
          return (
            <div>
              {m.letter && m.letter.thumbnail && (
                <Image src={m.letter.thumbnail} height={255} width={200} />
              )}
              {m.postcard && m.postcard.thumbnail && (
                <Image src={m.postcard.thumbnail} height={255} width={200} />
              )}
              <Link key={m.id} href={`/message/${m.id}`}>
                <a>Comments</a>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (context: {
  params: {artistId: any};
}) => {
  const {artistId} = context.params;
  const response: ArtistMessageResponse = await ArtistController.getMessages(
    artistId
  );

  return {
    props: {
      messages: response.messages
    }
  };
};
