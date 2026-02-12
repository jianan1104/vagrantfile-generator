import React from "react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 mt-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/jianan1104/"
            className="font-medium hover:text-foreground transition-colors"
          >
            jianan1104
          </a>
          . Built with care for the DevOps community.
        </p>
        <a
          href="https://github.com/jianan1104/vagrantfile-generator"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-3.5 w-3.5" />
          Source on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
