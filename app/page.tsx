"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user;

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");
    
    if (user?.id != null && hasReloaded == "false") {
      localStorage.setItem("hasReloaded", "true");

      window.location.reload();
    }
  }, [user]);

  return (
    <>
      <Hero />
    </>
  );
}
