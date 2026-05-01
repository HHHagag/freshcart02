import { getSingleProducts } from "@/apis/singleproduct.api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StarIcon } from 'lucide-react';
import MySlider from "@/app/_components/Slider/Slider";
import ButtonCom from "@/app/_components/ButtonCom";


export default async function page({params}:{params:Promise <{id:string}>}) {
    const id = ( await (params)).id
    console.log(id);

    const data = await getSingleProducts(id)
    console.log(data);
  return (
    <div className="flex items-center">
        <div className="md:w-1/3 w-full p-4">
        <Image src={data.imageCover} width={200} height={200}  className="w-2/3" alt =""/>
        <div className="flex gap-3">
            {data.images.map(img=><Image src={img} alt="pic"key={img} width={50} height={50} className="curser-pointer" />)}

            

        </div>
        </div>
        <div className="md:w-2/3 w-full p-4">
           <h2 className='font-light text-gray-500 my-2'>{data.category.name}</h2>
   
   <h2 className='line-clamp-2'>{data.title}</h2>
   <p>{data.description}</p>
    {/* rating*/}

    <p className='flex gap-2 items-center'>{data.ratingsAverage} <StarIcon className='text-yellow-400'></StarIcon></p>

   {/* price */}
   <div className='flex justify-between items-center'>
    <>
       {data.priceAfterDiscount ?(
      <div className='flex gap-3 my-2'>
      <p className='text-green-600'>{data.priceAfterDiscount}EGP</p>
      <p className='text-gray-500 text-sm line-through'>{data.price}EGP</p>
   </div>
    
   ):(
  <p className='my-2'>{data.price}EGP</p>
  )}
  </>
 
  </div>
  <div className="flex gap-5 my-5">
  
     <ButtonCom id={id}cls="curser-pointer text-white w-full d-block">Add to cart</ButtonCom>
     <Button className=' bg-black'>Buy it Now</Button>
  </div>
        </div>
    </div>
  )
}
