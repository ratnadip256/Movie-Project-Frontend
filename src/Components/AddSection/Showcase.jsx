import React, { useEffect, useState } from "react";
import AddSection from "./AddSection";

const Showcase = ({ list }) => {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * list.length)
  );

  const [fade, setFade] = useState("opacity-100");

  const triggerFade = (newIndex) => {
    setFade("opacity-0");

    setTimeout(() => {
      setIndex(newIndex);
      setFade("opacity-100");
    }, 300);
  };

  const next = () => {
    triggerFade((index + 1) % list.length);
  };

  const prev = () => {
    triggerFade((index - 1 + list.length) % list.length);
  };

  // Autoplay every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <AddSection 
      data={list[index]}
      onPrev={prev}
      onNext={next}
      fadeClass={fade}
    />
  );
};

export default Showcase;
