import React from 'react'
import CheckOut from '../CheckOut'

export default async function page
 ({params}:{params:Promise<{cartId:string}>}) {

  const cartId = (await params).cartId

  // console.log('cartId');
  
  return (
     <CheckOut cartId={cartId}></CheckOut>
  )
}
  