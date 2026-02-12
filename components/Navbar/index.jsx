import React from "react";
import GitHubButton from "react-github-btn";
import ThemeToggle from "../ThemeToggle";
import { Badge } from "../../src/components/ui/badge";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full glass-strong">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="https://vagrantfile-generator.vercel.app/"
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <img
              src="images/vagrant-icon.png"
              className="h-8 transition-transform duration-200 group-hover:scale-110"
              alt="Vagrant Logo"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-lg tracking-tight">
              Vagrantfile Generator
            </span>
            <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-mono">
              v2.0
            </Badge>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-5 w-px bg-border" />
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
