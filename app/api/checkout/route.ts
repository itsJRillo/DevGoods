import { NextResponse } from "next/server";
import Stripe from "stripe";
import { storageProductURL } from '@/app/utils/index';

const stripe = new Stripe(
  "sk_test_51OurI9EiFAQh0yCeAUBKp9ZpfryE1aFl8JKFuLsslwbBiGGLlflsJ3u6S0LD1dStqs8Dc5c7U9VIbg2iBqOATdVt00Py0e3OSm"
);

export async function POST(rq: Request) {
  const body = await rq.json();
  
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: body.name,
            images: [
              storageProductURL + body.photo_url
            ],
          },
          unit_amount: body.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return NextResponse.json(session);
}
