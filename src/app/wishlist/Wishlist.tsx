
'use client';

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../_components/Loading/Loading";
import { removeFromWishlist } from "@/apis/wishlist/actions/removeFromWishlist"
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WishlistPage() {

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("failed to fetch wishlist");
      return res.json();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  if (isLoading) return <Loading />;

  const wishlist = data?.data ?? [];

  if (!wishlist.length) {
    return (
      <h2 className="text-center text-gray-500 py-10">
        Wishlist is empty
      </h2>
    );
  }

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        My Wishlist 
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {wishlist.map((item: any) => (
            <TableRow key={item._id}>

              
              <TableCell>
                <img
                  src={item.imageCover}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>

              <TableCell>{item.title}</TableCell>

              <TableCell>{item.price} EGP</TableCell>

              <TableCell className="flex gap-3 items-center">

                
                <FaTrash
                  className="text-red-600 cursor-pointer"
                  onClick={() => deleteMutate(item._id)}
                />

               

                <Link href="/cart">
  <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">
    View Cart
  </button>
</Link>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>

     
      <Link
        href="/shop"
        className="inline-block mt-6 text-green-600 font-medium hover:underline"
      >
        Continue Shopping
      </Link>

    </div>
  );
}