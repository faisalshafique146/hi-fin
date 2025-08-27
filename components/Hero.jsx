"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    const imageElement = imageRef.current;
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Mange Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze and optimize your sending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/dashboard"
            className={buttonVariants({ className: "px-8", size: "lg" })}
          >
            Get Started
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              className="rounded-lg shadow-2xl border mx-auto"
              width={1280}
              height={720}
              alt="banner"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
