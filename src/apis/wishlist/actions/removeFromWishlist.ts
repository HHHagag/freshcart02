'use server';

import { getTokenFn } from "@/utilities/getTokenFun";

export async function removeFromWishlist(productId: string) {
  const token = await getTokenFn();

  if (!token) return { error: "login first" };

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
      },
    }
  );

  const data = await res.json();

  console.log("DELETE RESPONSE:", data);

  return data;
}