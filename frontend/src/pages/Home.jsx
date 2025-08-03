import React from "react";
import { Boxes } from "../components/ui/background-boxes";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { useNavigate } from "react-router-dom";
import { PointerHighlight } from "../components/ui/pointer-highlight";

export function Home() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate("/login")
    } else {
      navigate("/splitit")
    }
  }

  return (
    <>
      <div className="min-h-screen relative w-full overflow-hidden dark:bg-slate-900 flex flex-col gap-10 items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1 className={cn("md:text-4xl text-xl font-semibold dark:text-white text-black relative z-20")}>
          <PointerHighlight>SPLIT EXPENSES WITH FRIENDS</PointerHighlight>
        </h1>
        <p className="text-center mt-2 font-medium text-neutral-800 dark:text-neutral-200 relative z-20">
          SplitIt is the best way to split expenses with your friends
        </p>
        <Button
          onClick={handleGetStarted}
          className="mt-4 z-10 dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:shadow-none dark:hover:ring-0 cursor-pointer"
        >
          Get Started
        </Button>
      </div>
      <HoverEffect className="bg-gradient-to-b from-slate-500 to-slate-700 dark:from-slate-700 dark:to-slate-900"
        items={[
          {
            title: "Multiple Spaces",
            description: "Create different spaces for different circles of friends",
            link: "https://x.com/TarunSharm202",
          },
          {
            title: "Secure Payments",
            description: "Safe and secure payment processing for settling up",
            link: "https://www.linkedin.com/in/tarun-sharma-a0a5552b4",
          },
          {
            title: "Detailed Reports",
            description: "View detailed expense reports and analytics",
            link: "https://github.com/tarunsh08",
          },
        ]}
      />
    </>
  );
}

export default Home;
