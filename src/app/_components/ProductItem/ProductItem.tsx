import { Button } from '@/components/ui/button';
import { productInterface } from '@/interfaces/product.interface'
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link"
import ButtonCom from '../ButtonCom';
import { FaHeart } from 'react-icons/fa';
import Buttonlist from '../ButtonWishlist'



interface pageProps{
    prod:productInterface;
}

export default function ProductItem({prod}: pageProps) {
  return (
    <div className="p-4 rounded-[8px] border border-border-color">

  <Link href={`/productdetails/${prod._id}`}>
   <Image
   width={100}
   height={100}
   src={prod.imageCover} className='w-1/2 mx-auto' alt={prod.title} />
  </Link>

   <h5 className='font-light text-gray-500 my-2'>{prod.category.name}</h5>
   <p className='line-clamp-2'>{prod.title}</p>


    <p className='flex gap-2 items-center'>{prod.ratingsAverage} <StarIcon className='text-yellow-400'></StarIcon></p>

 
   <div className='flex justify-between items-center'>
    <>
       {prod.priceAfterDiscount ?(
      <div className='flex gap-3 my-2'>
      <p className='text-green-600'>{prod.priceAfterDiscount}EGP</p>
      <p className='text-gray-500 text-sm line-through'>{prod.price}EGP</p>
   </div>
    
   ):(
  <p className='my-2'>{prod.price}EGP</p>
  )}
  </>
  
 <div className="flex items-center gap-2">
  
<Buttonlist
    id={prod._id}
    cls="rounded-full cursor-pointer text-white bg-green-500"
  >
    <FaHeart />
  </Buttonlist>


  <ButtonCom
    id={prod._id}
    cls="rounded-full cursor-pointer text-white bg-green-500"
  >
    +
  </ButtonCom>
  

</div>
   </div>
  </div>
  );
}
