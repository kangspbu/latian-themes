"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./_context/useTheme";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme == "light-theme" ? "dark-theme" : "light-theme");
  };

  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background items-center  py-40 flex-col gap-20">
      <div className="font-black text-4xl text-foreground">Theme Test</div>
      <div className="text-foreground font-black text-3xl">
        Current Theme: {theme}
      </div>

      {/* <div className=" flex gap-4">
        {THEMES.map((theme) => (
          <button
            key={theme}
            className=" uppercase font-bold rounded-3xl p-4 bg-foreground text-background"
            onClick={() => setTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div> */}

      <div className="flex border rounded-3xl p-4">
        <label className="inline-flex items-center cursor-pointer">
          <span className="select-none text-sm font-medium text-heading text-foreground">
            Light Theme
          </span>
          <input
            type="checkbox"
            value={theme}
            className="sr-only peer"
            onChange={handleToggle}
            checked={theme === "dark-theme"}
          />
          <div className="relative mx-3 w-9 h-5 bg-foreground peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-background after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
          <span className="select-none text-sm font-medium text-heading text-foreground">
            Dark Theme
          </span>
        </label>
      </div>
      <div className="flex gap-20">
        <div className="bg-primary w-50 h-50 justify-center flex items-center font-bold text-lg text-background ">
          <div className="bg-background text-foreground rounded-2xl p-3">
            Primary
          </div>
        </div>
        <div className="bg-secondary w-50 h-50 justify-center flex items-center font-bold text-lg text-background">
          <div className="bg-background text-foreground rounded-2xl p-3">
            Secondary
          </div>
        </div>

        <div className="bg-accent w-50 h-50 justify-center flex items-center font-bold text-lg text-background">
          <div className="bg-background text-foreground rounded-2xl p-3">
            Accent
          </div>
        </div>
      </div>
    </div>
  );
}
