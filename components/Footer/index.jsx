import React from "react";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-6 mt-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://github.com/jianan1104/"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            jianan1104
          </a>
          . All rights reserved.
        </p>
        <a
          href="https://github.com/jianan1104/vagrantfile-generator"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
