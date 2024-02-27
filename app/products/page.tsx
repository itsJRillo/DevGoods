"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import HeroProduct from "../../components/HeroProduct";
import Filters from "../../components/Filters";

type Product = {
  id: number
  name: string
  description: string
  price: number
  brand: string
}

export default function Products() {
  const supabase = createClient("https://asoqdvxkiasjqgcrwbmm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzb3FkdnhraWFzanFnY3J3Ym1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5MzU5MDUsImV4cCI6MjAyNDUxMTkwNX0.rMW6cOlEVKZlUFbuIvR33XOYLUdqrjYfnaVqhi-Z9xE");

  const [products, setProducts] = useState<Product[] | null>([]);

  async function getProducts() {
    const { data } = await supabase.from("Products").select("*");
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HeroProduct />
      <Filters>
        <div className="p-5 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3">
            {products?.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} description={p.description} price={p.price} provider={p.provider} />
            ))}
          </div>
        </div>
      </Filters>
    </>
  );
}
