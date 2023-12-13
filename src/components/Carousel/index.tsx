"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import SpiderDetails from "../SpiderDetail";
import SpiderPicture from "../SpidersPicture";

import styles from "./carousel.module.scss";

import { ISpiderData } from "@/interfaces/spiders";

interface IProps {
  spiders: ISpiderData[];
  activeId: string;
}

enum enPosition {
  FRONT = 0,
  MAIN = 1,
  BACK = 2,
}

export default function Carousel({ spiders, activeId }: IProps) {
  const [visibleItems, setVisibleItems] = useState<ISpiderData[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(
    spiders.findIndex((spider) => spider.id === activeId) - 1
  );

  const [startInterectionPosition, setStartInterectionPosition] =
    useState<number>(0);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % spiders.length) + spiders.length) % spiders.length;
    const visibleItems = [...spiders, ...spiders].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );
    setVisibleItems(visibleItems);
  }, [spiders, activeIndex]);

  useEffect(() => {
    const HTMLEl = document.querySelector("html");

    if (!HTMLEl || !visibleItems) {
      return;
    }

    const currentSpiderId = visibleItems[enPosition.MAIN].id;
    HTMLEl.style.backgroundImage = `url("/spiders/${currentSpiderId}-background.png")`;
    HTMLEl.classList.add("spider-page");

    return () => {
      HTMLEl.classList.remove("spider-page");
    };
  }, [visibleItems]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartInterectionPosition(e.clientX);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startInterectionPosition) {
      return null;
    }
    handleChangeDragTouch(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartInterectionPosition(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startInterectionPosition) {
      return null;
    }
    handleChangeDragTouch(e.changedTouches[0].clientX);
  };

  const handleChangeDragTouch = (clientX: number) => {
    const endInterectionPosition = clientX;
    const diffPosition = endInterectionPosition - startInterectionPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveItem) => prevActiveItem + newDirection);
  };

  useEffect(() => {
    if (!visibleItems) {
      return;
    }
    transitionAudio.play();

    const voiceAudio = voicesAudio[visibleItems[enPosition.MAIN].id];

    if (!voiceAudio) {
      return;
    }

    voiceAudio.volume = 0.3;
    voiceAudio.play();
  }, [visibleItems, transitionAudio, voicesAudio]);

  if (!visibleItems) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.spider}
                transition={{ duration: 0.8 }}
                initial={{ x: -1500, scale: 0.75 }}
                animate={{ x: 0, ...getItemstyles(index) }}
                exit={{ x: 0, opacity: 0, scale: 1, left: "-20%" }}
              >
                <SpiderPicture spider={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <SpiderDetails data={visibleItems[enPosition.MAIN]} />
      </motion.div>
    </div>
  );
}

const getItemstyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2,
    };
  }

  if (position === enPosition.MAIN) {
    return {
      zIndex: 2,
      left: "300px",
      scale: 0.8,
      top: "-10%",
    };
  }

  return {
    zIndex: 1,
    filter: "blur(8px)",
    left: "160px",
    top: "-20%",
    scale: 0.6,
    opacity: 0.8,
  };
};
