import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()
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
      <Button onClick={() => navigate("/splitit")} className="mt-4 z-10 dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:shadow-none dark:hover:ring-0 cursor-pointer">Get Started</Button>
    </div>
    <HoverEffect className="bg-gradient-to-b from-slate-500 to-slate-700 dark:from-slate-700 dark:to-slate-900"
        items={[
          {
            title: "Multiple Groups",
            description: "Create different groups for different circles of friends",
            link: "#",
          },
          {
            title: "Secure Payments",
            description: "Safe and secure payment processing for settling up",
            link: "#",
          },
          {
            title: "Detailed Reports",
            description: "View detailed expense reports and analytics",
            link: "#",
          },
        ]}
      />
    </>
  );
}

export default Home;
