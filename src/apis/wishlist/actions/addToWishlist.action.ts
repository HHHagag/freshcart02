'use server'
import { getTokenFn } from "@/utilities/getTokenFun";

export async function addToWishlist(productId: string) {
  const token = await getTokenFn();

  if (!token) {
    return { error: "Please login first" };
  }

  try {
    const res = await fetch(`${process.env.API}wishlist`,
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      }
    );

    const data = await res.json();

    console.log("Data:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to add to wishlist");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("unauthorized!");
  }
}