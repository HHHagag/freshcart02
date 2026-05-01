'use client'
import { onlinePayment } from '@/apis/payment/checkout.api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function CheckOut({cartId}:{cartId: string}) {

   
    interface formData{
        city:string,
        details:string,
        phone:string
    }
    const {register,handleSubmit}=useForm <formData>()

    async function handleCheckOut(data:formData){
     const res = await onlinePayment(cartId,data)
     console.log(res)
     if(res.status==='success')
          window.location.href = res.session.url

      
    }
  return (
    <div>
        <form className='w-1/2 mx-auto my-7' onSubmit={handleSubmit(handleCheckOut)}>
        <Input {...register('details')} className='w-full my-2 border border-gray-500 p-3 rounded' placeholder='details'/>

        <Input {...register('phone')}  className='w-full my-2 border border-gray-500 p-3 rounded' placeholder='phone' type="tel"/>

        <Input {...register('city')}  className='w-full my-2 border border-gray-500 p-3 rounded' placeholder='city' />
        
    
        <Button>Send</Button>
        </form>
    </div>
  )
}
