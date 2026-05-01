import React from 'react'

import { getbrands } from "@/apis/brands.api";
import Link from "next/link"

export default async function BrandsPage() {
  const brands = await getbrands();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
{brands.map((brand) => (
  <Link href={`/brands/${brand._id}`} key={brand._id}>
    <div className="border rounded-lg p-4 text-center hover:shadow-lg transition cursor-pointer">
      <img
        src={brand.image}
        alt={brand.name}
        className="w-full h-32 object-contain mb-3"
      />
      <p className="font-medium">{brand.name}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  );
}
