"use client";
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import { useUser } from "./utils/useUser";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useUser();
  const router = useRouter()

  const prevUserRef = useRef<User | null>(null);

  useEffect(() => {
    if (user!== prevUserRef.current) {
      router.push("/products")
    }
    prevUserRef.current = user;
  }, [user]);

  return (
    <>
      <Hero />
    </>
  );
}