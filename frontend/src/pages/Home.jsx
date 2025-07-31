import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { HoverEffect } from "../components/ui/card-hover-effect";

export function Home() {
  return (
    <>
    <div
      className="min-h-screen relative w-full overflow-hidden dark:bg-slate-900 flex flex-col gap-10 items-center justify-center">
      <div
        className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <h1 className={cn("md:text-4xl text-xl font-semibold dark:text-white text-black relative z-20")}>
        SPLIT EXPENSES WITH FRIENDS
      </h1>
      <p className="text-center mt-2 font-medium text-neutral-800 dark:text-neutral-200 relative z-20">
        SplitIt is the best way to split expenses with your friends
      </p>
      <Button className="mt-4 z-10 dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:shadow-none dark:hover:ring-0 cursor-pointer">Get Started</Button>
    </div>
    <HoverEffect
        items={[
          {
            title: "SplitIt",
            description: "SplitIt is the best way to split expenses with your friends",
            link: "https://splitit.aceternity.com",
          },
          {
            title: "SplitIt",
            description: "SplitIt is the best way to split expenses with your friends",
            link: "https://splitit.aceternity.com",
          },
          {
            title: "SplitIt",
            description: "SplitIt is the best way to split expenses with your friends",
            link: "https://splitit.aceternity.com",
          },
        ]}
      />
    </>
  );
}

export default Home;
