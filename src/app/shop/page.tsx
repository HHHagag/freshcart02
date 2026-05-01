import { getProducts } from "@/apis/products.api";
import ProductItem from "../_components/ProductItem/ProductItem";


export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="px-10 py-10">

      <h2 className="text-2xl font-bold mb-6">
        <span className="text-green-500 underline">All Products</span>
      </h2>

      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5">
        {products?.map((prod) => (
          <ProductItem key={prod._id} prod={prod} />
        ))}
      </div>

    </div>
  );
}