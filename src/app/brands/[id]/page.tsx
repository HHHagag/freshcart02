import { getByBrand } from "@/apis/brand.api";
import ButtonCom from "@/app/_components/ButtonCom";

export default async function BrandProductsPage({ params }: any) {
  const { id } = await params;
  const products = await getByBrand(id);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold">No Products Found</h2>
          <p>No products match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((prod: any) => (
            <div key={prod._id} className="border p-4 rounded-lg">
              <img
                src={prod.imageCover}
                className="w-full h-40 object-contain mb-2"
              />
              <h5>{prod.title}</h5>
              <p>{prod.price} EGP</p>

              <ButtonCom
                id={prod._id}
                cls="rounded-full cursor-pointer text-white bg-green-500 px-3 py-1"
              >
                +
              </ButtonCom>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}