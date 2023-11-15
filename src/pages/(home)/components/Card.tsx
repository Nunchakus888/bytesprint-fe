import LinkButton from "./LinkButton";
import React from "react";
import { Show } from '@chakra-ui/react';

// @ts-ignore
export default function Card({ H1: title, H2: description, button: link, bg: img }) {
  return (
    <div className="w-full relative">
      <img src={img} className="w-full h-full object-contain relative" />

      <div className="px-4 md:px-20 absolute left-0 inset-y-1/4 md:inset-y-1/3 text-left flex flex-col justify-between gap-4">
        <p className="text-2xl md:text-4xl font-bold">{title}</p>
        <p className="text-base md:text-lg">{description}</p>
        <Show above="md">
          <LinkButton variant="outline" borderRadius="10px">{link}</LinkButton>
        </Show>
      </div>
    </div>
  );
}
