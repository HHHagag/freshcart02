import { getProducts } from '@/apis/products.api'
import React from 'react'
import ProductItem from '../_components/ProductItem/ProductItem';

export default async function Products() {
    const data = await getProducts()
    console.log(data);
    
  return (
    <>
     <h2 className='my-5'>Feaured<span className='text-green-500 underline my-5'> Products</span></h2>
    <div className='grid xl:grid-cols-5 gap-5 py-10 md:grid-cols-4 grid-cols-1'>{data?.map(prod=><ProductItem prod={prod} key={prod._id}></ProductItem>)}</div>
    </>
  )
}
