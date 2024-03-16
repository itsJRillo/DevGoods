import { NextResponse } from "next/server";
import Stripe from "stripe";
import { storageProductURL } from '@/app/utils/index';

const stripe = new Stripe(
  "sk_test_51OurI9EiFAQh0yCeAUBKp9ZpfryE1aFl8JKFuLsslwbBiGGLlflsJ3u6S0LD1dStqs8Dc5c7U9VIbg2iBqOATdVt00Py0e3OSm"
);

export async function POST(rq: Request) {
  const body = await rq.json();
  
  const product = body[0]
  const user = body[1]
  
  const session = await stripe.checkout.sessions.create({
    success_url: "https://devgoods.vercel.app/success",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            images: [
              storageProductURL + product.photo_url
            ],
          },
          unit_amount: product.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata:{
      product_id: product.id,
      user_id: user.id,
      username: user.user_metadata.username,
      user_email: user.email
    }
  });

  return NextResponse.json(session);
}
