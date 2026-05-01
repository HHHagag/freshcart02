'use client'
import { addToCart } from '@/apis/cart/actions/addCart.action'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { toast } from 'sonner'

interface pageProps{

  children:ReactNode,
  cls:string,
  id:string
}


export default function ButtonCom({children,cls,id}:pageProps) {
  const queryClient = useQueryClient()
  const {data,mutate} = useMutation({
    mutationFn:addToCart,
    onSuccess:()=>{
     toast('product added successfuly', { position: "top-right" });
     queryClient.invalidateQueries({queryKey:['cart']})
    },
    onError:()=>{
     toast("login first", { position: "top-right" }) 
    }
  })
  async function handleAddtoCart()
  {
   mutate(id)
 
  }
  return (
    <div>
      <Button onClick={handleAddtoCart} className={cls}>{children}</Button>
    </div>
  )
}
