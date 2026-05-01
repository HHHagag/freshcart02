export interface ProductInterface {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

export async function getByBrand(id: string) {
  if (!id) {
    throw new Error("Brand ID is undefined ❌");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
  );

  const data = await res.json();
  console.log(data);
  

  if (!res.ok) throw new Error(data.message);

  return data.data;
}