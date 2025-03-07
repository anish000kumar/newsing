import classNames from "classnames";
import { useMemo, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const youtubeIds = [
  "zW0pC_cOWKI",
  "iVKQNu5rwyg",
  "uq7IHJsSw4o",
  "wFCIE12oIDc",
  "Dt5ftyZjnGQ",
  "Pu9xAVgXPHw",
  "rZ173mZvUKw",
  "KP6Zt_9cn-4",
  "nHqjD3xel-0",
  "_X_ooOfXqGQ",
  "WFVqYRkROM4",
  "XgW_aTG8Nak",
  "a7bro17np_U",
  "9A6zmfLdQ_A",
  "lQOQ9hxaUAg",
  "G_yZnVm42UQ",
  "z80zQFFQEpU",
  "BSNWKILa4p8",
  "bBh_wj91cjY",
  "VNFWWbTA2FA",
  "UdmHtDaCa-o",
  "VYZt9QUh3Ow",
  "4vui4x7aIOw",
];
export default function Player() {
  const [animateState, setAnimateState] = useState(0);
  const [id, setId] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const prevId = useMemo(() => {
    return id === 0 ? youtubeIds.length - 1 : id - 1;
  }, [id]);

  const nextId = useMemo(() => {
    return (id + 1) % youtubeIds.length;
  }, [id]);

  const idArr = useMemo(() => {
    return [prevId, id, nextId];
  }, [id, nextId, prevId]);

  const next = () => {
    setIsReady(false);
    setAnimateState(1);
  };

  const previous = () => {
    setIsReady(false);
    setAnimateState(-1);
  };

  const onTransitionEnd = () => {
    if (animateState === 1) {
      setId((id + 1) % youtubeIds.length);
    } else if (animateState === -1) {
      if (id === 0) {
        setId(youtubeIds.length - 1);
      } else {
        setId(id - 1);
      }
    }
    setAnimateState(0);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onReady(_e: YouTubeEvent<unknown>) {
    setIsReady(true);
  }

  return (
    <div
      onTransitionEnd={onTransitionEnd}
      className={classNames("belt relative", {
        up: animateState === 1,
        down: animateState === -1,
      })}
    >
      {idArr.map((_id) => (
        <div
          key={_id}
          style={{ background: "black" }}
          className="h-[100vh] grid place-items-center"
        >
          {prevId === _id && (
            <YouTube
              style={{ opacity: isReady ? 1 : 0 }}
              onReady={onReady}
              videoId={youtubeIds[_id]}
              opts={{
                height: window.innerHeight + 100,
                width: window.innerWidth,
                playerVars: {
                  autoplay: 1,
                },
              }}
            ></YouTube>
          )}
        </div>
      ))}
      <div
        onClick={previous}
        className="h-[20vh] w-full z-10 bg-slate-300 top-0 opacity-0 absolute"
      ></div>
      <div
        onClick={next}
        className="h-[20vh] w-full z-10 bg-slate-300 bottom-0 opacity-0 absolute"
      ></div>
    </div>
  );
}
