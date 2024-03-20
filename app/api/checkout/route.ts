import { NextResponse } from "next/server";
import Stripe from "stripe";
import { storageProductURL } from "@/app/utils/index";
import supabase from "@/app/supabaseClient";

const stripe = new Stripe(
  "sk_test_51OurI9EiFAQh0yCeAUBKp9ZpfryE1aFl8JKFuLsslwbBiGGLlflsJ3u6S0LD1dStqs8Dc5c7U9VIbg2iBqOATdVt00Py0e3OSm"
);

export async function POST(rq: Request) {
  const body = await rq.json();

  const products = body[0];

  const user = body[1];

  const lineItemsPromises = products.map(async (product: any) => {
    const { data: productData, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", product.product_id);
  
  if (error) {
    console.log(error.message);
    return null; // Return null if there's an error
  } else {
    const productInfo = productData[0]; // Access the first (and only) object in the array
    console.log(productInfo);

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: productInfo.name,
          images: [storageProductURL + productInfo.photo_url],
        },
        unit_amount: productInfo.price * 100,
      },
      quantity: 1,
    };
  }
  });

  const lineItems = await Promise.all(lineItemsPromises);

  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      user_id: user.id,
      username: user.user_metadata.username,
      user_email: user.email,
    },
  });

  console.log(session);

  return NextResponse.json(session);
}
