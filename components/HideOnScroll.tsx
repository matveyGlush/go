"use client"

import { Slide, useScrollTrigger } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

export default function HideOnScroll({ children, window }: Props) {
  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      { children ?? <div/> }
    </Slide>
  );
}