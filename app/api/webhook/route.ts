import supabase from "@/app/supabaseClient";
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
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id
      );

      const { error } = await supabase
        .from("invoices")
        .insert({ status: session.status, currency: session.currency, unit_amount: session?.amount_total?? 0 , product_id: session.metadata?.product_id, user_id: session.metadata?.user_id})
        .select();

    console.log(error?.message);
        
      return NextResponse.json(session);

    }
    default:
      console.log("Evento no controlado: " + event.type);
  }

  return new Response(null, { status: 200 });
}
