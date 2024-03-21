import supabase from "@/app/supabaseClient";
import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OurI9EiFAQh0yCeAUBKp9ZpfryE1aFl8JKFuLsslwbBiGGLlflsJ3u6S0LD1dStqs8Dc5c7U9VIbg2iBqOATdVt00Py0e3OSm"
);
const endpointSecret = "whsec_j7tdtNuYS24hJhsmmrEanSUgGrvn2MC6";
export async function POST(rq: Request) {
  const body = await rq.text();
  const headerList = headers();
  const sig = headerList.get("stripe-signature");

  const bodyBuffer = Buffer.from(body);
  const sigBuffer = Buffer.from(sig || "");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      sigBuffer,
      endpointSecret
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      let uuidOrder = randomUUID();
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id
      );
      console.log(session);

      const products = session.metadata?.products_id.includes(",")
        ? session.metadata?.products_id.split(",")
        : [session.metadata?.products_id];

      const { error } = await supabase
        .from("orders")
        .insert({
          id: uuidOrder,
          user_id: session.metadata?.user_id,
          quantity: products.length,
        })
        .select();
      console.log(error);

      for (const product_id of products) {
        const product_id_number = Number(product_id) || 0;

        const { error } = await supabase
          .from("invoices")
          .insert({
            product_id: product_id_number,
            total_amount: session?.amount_total ?? 0,
            currency: session.currency,
            user_id: session.metadata?.user_id,
            status: session.status,
            order_id: uuidOrder,
          })
          .select();
        console.log(error);
      }

      return NextResponse.json(session);
    }
    default:
      console.log("Evento no controlado: " + event.type);
  }

  return new Response(null, { status: 200 });
}
