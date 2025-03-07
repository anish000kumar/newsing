import classNames from "classnames";
import { useMemo, useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

const youtubeIds = [
  "0gQPBQT_Q9k",
  "r592sC7c_QM",
  "lLR44Bi01ew",
  "4psugpMxIug",
  "C_x98NK55pI",
  "4DVdASLRoEw",
  "Vq1tC0dP-M0",
  "RrGHkA8ouUs",
  "7Xj5PrUlhn4",
  "MW0T2DsJSn4",
  "KVMaKeNnmkk",
  "gAKvwsGM92s",
  "Bm15ifRfHkw",
  "6Qk54AZc2go",
  "zA9gEx23UUU",
  "VwY-G32fUW8",
  "1irpND0yhGA",
  "LnzkgdPZGAU",
  "HwOZhKwcpN8",
  "qhVzFbIng54",
  "k3_TAiTEzBU",
  "vjib9WWZoKI",
  "CViZyZ83kmM",
  "-kSWkWi6SXw",
  "iHZlqEmSWnQ",
  "cWwQpcqXHrY",
  "TZrHcjr5dJQ",
  "HM202gkzuTk",
  "ryFjES5mEr4",
  "0GENOzIza78",
  "RGqLMp-8TjY",
  "LhD2LlwUYgk",
  "0FmHXKNYwis",
  "cBojWSiixaE",
  "gvbBtw3DmGw",
  "c63fJiLXktI",
  "bf-i6yQEtho",
  "zn3cPSauNc8",
  "8si9x3CziIE",
  "UVGX_u7_VOo",
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
              videoId={youtubeIds[_id] + "?rel=0"}
              opts={{
                height: window.innerHeight,
                width: window.innerWidth,
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                  modestbranding: 1,
                },
              }}
            ></YouTube>
          )}
          <div className="fixed flex text-white gap-3 flex-col right-10 p-4 bottom-15 z-20 text-xl">
            <button className="p-2 cursor-pointer transition active:scale-110">
              <i className="bi bi-heart-fill "></i>
            </button>
            <button className="p-2 cursor-pointer transition active:scale-110">
              <i className="bi bi-chat-fill "></i>
            </button>
            <button className="p-2 cursor-pointer transition active:scale-110">
              <i className="bi bi-share-fill "></i>
            </button>
          </div>
        </div>
      ))}
      <div
        onClick={previous}
        className="h-[33vh] w-full z-10 bg-slate-300 top-0 opacity-0 absolute"
      ></div>
      <div
        onClick={next}
        className="h-[33vh] w-full z-10 bg-slate-300 bottom-0 opacity-0 absolute"
      ></div>
    </div>
  );
}
