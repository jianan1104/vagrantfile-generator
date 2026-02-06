import React from "react";
import GitHubButton from "react-github-btn";
import ThemeToggle from "../ThemeToggle";
import { Separator } from "../../src/components/ui/separator";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <a
          href="https://vagrantfile-generator.vercel.app/"
          className="flex items-center gap-2"
        >
          <img
            src="images/vagrant-icon.png"
            className="h-7"
            alt="Vagrant Logo"
          />
          <span className="font-bold text-lg tracking-tight">
            Vagrantfile Generator
          </span>
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          <GitHubButton
            href="https://github.com/jianan1104/vagrantfile-generator"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star jianan1104/vagrantfile-generator on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
