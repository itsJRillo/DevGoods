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

  let lineItems: any;
  let lineItemsPromises: any;
  let session;

  if (Array.isArray(products)) {
    lineItemsPromises = products.map(async (product: any) => {
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", product.product_id);
  
      if (error) {
        console.log(error.message);
      } else {
        const productInfo = productData[0];
  
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
  
    lineItems = await Promise.all(lineItemsPromises);
    
    session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      line_items: lineItems,
      mode: "payment",
      metadata: {
        user_id: user.id,
        username: user.user_metadata.username,
        user_email: user.email,
      },
    });
  } else {
    session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: products.name,
              images: [storageProductURL + products.photo_url],
            },
            unit_amount: products.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        user_id: user.id,
        username: user.user_metadata.username,
        user_email: user.email,
      },
    });
  }

  return NextResponse.json(session);
}


