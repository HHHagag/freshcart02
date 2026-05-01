export interface BrandInterface{
name:string,
image:string,
_id:string
}

export async function getbrands():Promise <BrandInterface[]>{
 try {
        const data =await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
        if (!data.ok)throw new Error ("some error")
    const payload =await data.json();
   return payload?.data;
 } catch (error) {
  console.log(error);
  throw error;
}
}