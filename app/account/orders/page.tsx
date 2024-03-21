"use client"
import supabase from '@/app/supabaseClient';
import HeroCustom from '@/components/HeroCustom';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

type Order = {

}

export default function Orders() {
  let user: User;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("sb-iovmeejceocblildcubg-auth-token") || "{}").user;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const { data: order, error } = await supabase
      .from("orders").select("*")
      // .insert({
      //   product_id: session.metadata?.product_id,
      //   total_amount: session?.amount_total ?? 0,
      //   currency: session.currency,
      //   status: session.status,
      //   user_id: session.metadata?.user_id,
      // })
      .eq("user_id", user.id);

    if (error) {
      console.log(error.message);
    } else {
      const listOrders = order.map((order: any) => order.id)
      let invoices: any = [];

      for (const order_id of listOrders) {
        const {data, error } = await supabase.from("invoices").select("*").eq("order_id", order_id);
        invoices.push(data);
      }
      
      setOrders(invoices);
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <HeroCustom title='My orders' desc="Follow-up, return a product or repeat previous purchases" />
      <div>
        {orders.map((order: any) => (
          <>
          </>
        ))}
      </div>
    </div>
  )
}
