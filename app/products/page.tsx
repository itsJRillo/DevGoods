"use client";

import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";
import HeroCustom from "@/components/HeroCustom";
import Filters from "@/components/Filters";
import { Product } from "@/app/utils";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {

  const [products, setProducts] = useState<Product[] | null>([]);

  async function getProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <HeroCustom title="Shop" desc="Search for everything here!!" />
      <ToastContainer />
      <Filters>
        <div className="p-5 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
            {products?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </Filters>

    </>
  );
}
