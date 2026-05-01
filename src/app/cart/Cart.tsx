'use client'
import React from "react"
import { FaTrash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCart } from "@/apis/cart/cart.api"
import { Button } from "@/components/ui/button"
import { Mutation, useMutation, useMutationState, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItemCart } from "@/apis/cart/actions/deleteCart.action";
import { CartRes, productType } from "@/apis/cart/interfaces/cart.interface";
import Loading from "../_components/Loading/Loading";
import { updateCart } from "@/apis/cart/actions/updateCart.action";
import { clearCart } from "@/apis/cart/actions/clear.actions";
import Link from "next/link";

export default function Cart() {


//   console.log("cart", data?.data?.products);

const {data} =useQuery<CartRes>({
    queryKey:['cart'],
    queryFn:async ()=>{
      const data = await fetch(`/api/cart`);
      if (!data.ok) throw new Error ('failed to fetch cart')
        return data.json()
    }
})
const queryClient = useQueryClient();
//  console.log(data);
const { mutate: delMutate, data: delData, isPending: delPending } =
  useMutation({
    mutationFn: deleteItemCart,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['cart']})
    },
  });
  
  //  if(delPending)
  //   return <Loading></Loading>


// updatecart


//  console.log(data);
const { mutate: updatemutate, data: updateData, isPending: updatePending, } =
  useMutation({
    mutationFn: updateCart,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['cart']})
    },
  });
  function handlemutate(productId:string,count:number){
   
    
    updatemutate({productId,count})
  }
  const { mutate: clearMutate,

   } =
  useMutation({
    mutationFn: clearCart,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['cart']})
    },
  });



  if(updatePending || delPending)
    return <Loading/>

  // console.log("updateData",updateData);
  
  
  //  if(delPending)
  //   return <Loading></Loading>
function handlerClear(){
  clearMutate()
}

if(!data?.numOfCartItems)
  return <h2 className="flex items-center justify-center text-gray-500 text-lg py-10">cart is empty</h2>
   return (
    <>
      <div className="overflow-hidden rounded-md border">
        <h1 className="my-2">Total CartPrice : <span className="font-bold text-green-500">{data?.data?.totalCartPrice} EGP </span>
        
        </h1>
        
        <h3 className="my-2">numOfCartItem :{data?.numOfCartItems}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ProductName</TableHead>
            <TableHead>productImage</TableHead>
            <TableHead>productPrice</TableHead>
            <TableHead>productcount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.products?.map((prod: productType) => (
            
            <TableRow key={prod.product._id}>
              <TableCell>{prod.product.title}</TableCell>

              <TableCell>
                <img
                  src={prod?.product?.imageCover}
                  className="w-[100px]"
                  alt={prod.product.title}
                />
              </TableCell>

              <TableCell>{prod?.price} EGP</TableCell>

              <TableCell>
                <div className="flex gap-2 items-center">
          <Button onClick={()=>handlemutate(prod?.product?._id,prod?.count+1)}>+</Button>
                  <span>{prod?.count}</span>
                  <Button onClick={()=>handlemutate(prod?.product?._id,prod?.count-1)}>-</Button>
                </div>
                
                 
                </TableCell>
              <TableCell>
                    {<FaTrash className="text-red-700 text-xl cursor-pointer" onClick={()=>delMutate(prod?.product?._id)} />}
              </TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
      </div>
     <div className="my-5 flex justify-end w-full">
     <Button onClick={handlerClear}>clearCart</Button>
     <Link href={`/checkout/${data?.cartId}`}><Button>checkout</Button></Link>
      
     </div>
  </>
  )
}