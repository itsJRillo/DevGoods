"use client"
import supabase from '@/app/supabaseClient';
import HeroCustom from '@/components/HeroCustom';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import OrderItem from '../../../components/OrderItem';
import { dateFormatter } from '../../utils/index';

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
        const { data, error } = await supabase.from("invoices").select("*").eq("order_id", order_id);
        invoices.push(data);
      }
      setOrders(invoices.map((invoice: any) => invoice));
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div>
      <HeroCustom title='My orders' desc="Follow-up, return a product or repeat previous purchases" />
      <div>
        {orders.map((orderArray: any, orderIndex: number) => {
          const order = orderArray[0];
          return (
            <div key={orderIndex} className='overflow-x-auto p-10'>
              <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                <div
                  className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                  <div className="data">
                    <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">#{order.order_id}</span></p>
                    <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium">{dateFormatter(order.purchased_at)}</span></p>
                  </div>
                </div>

                <div className="w-full px-3 min-[400px]:px-6">
                  {orderArray.map((product: any) => (
                    <OrderItem key={product.id} product={product}/>
                  ))}

                </div>

                <div className="w-full border-t border-gray-200 px-6 flex flex-col items-center justify-between ">
                  <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> {order.total_amount / 100}€</span></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  )
}
