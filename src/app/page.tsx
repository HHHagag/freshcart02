import Image from "next/image";
import Products from "./_components/productshome/Products";
import MySlider from "./_components/Slider/Slider";

import slider1 from '../../src/assets/finalProjects assets/ad.png'
import slider2 from '../../src/assets/finalProjects assets/ad.png'
import slider3 from '../../src/assets/finalProjects assets/ad.png'

import { lazy, Suspense } from 'react';
import Loading from "./_components/Loading/Loading";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";


const Categories = lazy(() => import('./_components/Categories/Categories'));

export default async function Home() {

  // const cookie =await cookies()

  // console.log('token',cookie.get('token')?.value);

  const data = await getServerSession()
  //  console.log("data",data);

  return (
    <div>
      {/* slider */}
      <h1>{data?.user.name}</h1>
      <MySlider
        slidesPerView={1}
        pageList={[
          {
            id: 1,
            img: slider1.src,
            title: "Fresh Products Delivered to your Door",
            desc: "Get 20% off your first order",
          },
          {
            id: 2,
            img: slider2.src,
            title: "Best Quality Fruits & Vegetables",
            desc: "Save more with weekly offers",
          },
          {
            id: 3,
            img: slider3.src,
            title: "Fast & Reliable Grocery Delivery",
            desc: "Shop now and enjoy instant delivery",
          },
        ]}
      />

      {/* categories */}
      <Suspense fallback={<Loading></Loading>}>
        <Categories />
      </Suspense>

      {/* product */}
      <Products />
    </div>
  );
}


