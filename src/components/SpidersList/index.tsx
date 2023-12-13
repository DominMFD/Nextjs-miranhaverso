"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import SpiderPicture from "../SpidersPicture";
import LeftArrow from "../../../public/icons/arrow1.svg";
import RightArrow from "../../../public/icons/arrow2.svg";

import styles from "./spidersList.module.scss";

import { spidermanFont } from "@/fonts";
import { ISpiderData } from "@/interfaces/spiders";

interface IProps {
  spiders: ISpiderData[];
}

export default function SpidersList({ spiders }: IProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startInterectionPosition, setStartInterectionPosition] =
    useState<number>(0);

  useEffect(() => {
    const spiderActive = document.getElementById(`${spiders[activeIndex].id}`);
    spiderActive?.classList.add(`${styles.ativo}`);
    const spiderActive2 = document.getElementById(
      `${spiders[activeIndex].id}2`
    );
    spiderActive2?.classList.add(`${styles.active}`);

    console.log(spiderActive);
  }, [spiders, activeIndex]);

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

  const handleChageSpider = () => {
    const spiderActive = document.getElementById(`${spiders[activeIndex].id}`);
    spiderActive?.classList.remove(`${styles.ativo}`);
    const spiderActive2 = document.getElementById(
      `${spiders[activeIndex].id}2`
    );
    spiderActive2?.classList.remove(`${styles.active}`);
    if (activeIndex <= 6 && activeIndex >= 0) {
      setActiveIndex(activeIndex + 1);
    }
    if (activeIndex === 6) {
      setActiveIndex(0);
    }
  };

  const handleChageSpiderNegative = () => {
    const spiderActive = document.getElementById(`${spiders[activeIndex].id}`);
    spiderActive?.classList.remove(`${styles.ativo}`);
    const spiderActive2 = document.getElementById(
      `${spiders[activeIndex].id}2`
    );
    spiderActive2?.classList.remove(`${styles.active}`);
    if (activeIndex <= 6 && activeIndex >= 0) {
      setActiveIndex(activeIndex - 1);
    }
    if (activeIndex === 0) {
      setActiveIndex(6);
    }
  };

  return (
    <>
      <motion.h1
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        Personagens
      </motion.h1>
      <motion.ul
        className={styles.spiders}
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        {spiders.map((spider) => (
          <motion.li
            key={spider.id}
            className={`${styles.imageContainer} ${styles[spider.id]}`}
            id={`${spider.id}`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={LeftArrow}
              alt=""
              className={styles.arrows}
              onClick={handleChageSpiderNegative}
            />
            <Link href={`/spider/${spider.id}`}>
              <SpiderPicture spider={spider} />
            </Link>
            <Image
              src={RightArrow}
              alt=""
              className={styles.arrows}
              onClick={handleChageSpider}
            />
          </motion.li>
        ))}
      </motion.ul>
      <div className={styles.footerContainer}>
        {spiders.map((spider) => (
          <div key={spider.id} className={styles.circle}>
            <div id={`${spider.id}2`}></div>
          </div>
        ))}
      </div>
    </>
  );
}
