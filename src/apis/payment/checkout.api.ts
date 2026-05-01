'use server'
import { getTokenFn } from "@/utilities/getTokenFun"

interface shippingAddressInterface {
  details: string,
  phone: string,
  city: string
}

interface PaymentResponse {
  status: string;
  session: {
    url: string;
  };
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: shippingAddressInterface,
): Promise<PaymentResponse> {

  const token = await getTokenFn()

  if (!token) {
    throw new Error("unauthorized!")
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?utl=${process.env.NEXTAUTH_URL}`,
    {
      method: 'post',
      body: JSON.stringify({ shippingAddress }),
      headers: {
        'content-type': 'application/json',
        token,
      }
    }
  );

  const res = await data.json()

  if (!data.ok) {
    console.log("ERROR:", res)
    throw new Error(res.message || "checkout failed")
  }

  return res
}