"use client";

import { useEffect, useState, ReactElement } from "react";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

export default function HideOnScroll({ children, window }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const targetWindow = window ? window() : globalThis.window;
    if (!targetWindow) return;

    let lastScrollY = targetWindow.scrollY;

    const handleScroll = () => {
      const currentScrollY = targetWindow.scrollY;
      setShow(lastScrollY > currentScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };

    targetWindow.addEventListener("scroll", handleScroll);
    return () => targetWindow.removeEventListener("scroll", handleScroll);
  }, [window]);

  return (
    <div
      className={`transition-transform duration-300 ease-in-out ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children ?? <div />}
    </div>
  );
}
