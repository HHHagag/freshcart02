import { CategoryInterface, getCategories } from '@/apis/categories.api'
import Image from 'next/image';


export default async function Categories() {

  const data =await getCategories()
  // console.log(data);
  
  return (
   <>
   <h2 className='my-5'><span className='text-green-500 underline my-5'> All Categories</span></h2>
    <div className='grid gap-5 my-5  lg:grid-cols-4 md:grid-cols-7 grid-cols-2'>
      
  {data.map(cat => <CatItem key={cat._id} cat={cat}></CatItem>)}
</div>

   </>

  
  )
}

function CatItem({cat}:{cat:CategoryInterface}){

  return <div className=' rounded-[8px] shadow-md text-center border border-border-color p-3'>
    <img src={cat.image} width={100} height={100} className=' rounded-full mx-auto my-4 size-20' alt="" />
    <p>{cat.name} </p>
  </div>
}