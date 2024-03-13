"use client";

import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

import ProductCard from "../../components/ProductCard";
import HeroCustom from "../../components/HeroCustom";
import Filters from "../../components/Filters";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type Product = {
  id: number
  name: string
  description: string
  price: number
  brand: string
  photo_url: string
}

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
      <HeroCustom title="Shop" desc="Search for everything here!!"/>
      <ToastContainer/>
      <Filters>
        <div className="p-5 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3">
            {products?.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} description={p.description} price={p.price} brand={p.brand} avatarUrl={p.photo_url}/>
            ))}
          </div>
        </div>
      </Filters>
    </>
  );
}
