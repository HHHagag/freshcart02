
import { getTokenFn } from "@/utilities/getTokenFun";

export async function GET() {
  const token = await getTokenFn();

  if (!token) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API}wishlist`, {
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return Response.json(data);
}