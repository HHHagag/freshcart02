"use client"


import Link from "next/link"
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  
} from "@/components/ui/navigation-menu"

import logo from '../../../assets/finalProjects assets/favicon 1.png'
import Image from "next/image"
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const components = []

export function NavigationMenuDemo() {


   
  const {data,status} = useSession();
  
  const {data:cartData} = useQuery({
    queryKey:['cart'],
    queryFn:async ()=>{
      const data = await fetch(`/api/cart`);
      if (!data.ok) throw new Error ('failed to fetch cart')
      return data.json()
    }
  })

  const links =[
    {path:'/',element:'home'},
    {path:'/shop',element:'shop'},
    {path:'/brands',element:'brands'},
  ];

  const auth =[
    {path:'/login',element:'login'},
    {path:'/register',element:'register'},
  ];

  function handleLogOut(){
    signOut({redirect:true,callbackUrl:'/login'})
  }

  return (
    <NavigationMenu className="w-full max-w-full justify-between px-10 md:px-20 py-4">
      <Image src={logo} alt='fresh-cart-log'/>

      <NavigationMenuList>

        
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/categories" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    All Categories
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products?category=electronics" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Electronics
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products?category=women-fashion" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Women's Fashion
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products?category=men-fashion" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Men's Fashion
                  </Link>
                </NavigationMenuLink>
              </li>

              <li>
                <NavigationMenuLink asChild>
                  <Link href="/products?category=beauty-health" className="block px-2 py-1 hover:bg-gray-100 rounded">
                    Beauty & Health
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

       
        {status==='authenticated' ? (
          <>
            {links.map(link =>
              <NavigationMenuItem key={link.path} className="hidden md:flex bg-transparent" >
                <NavigationMenuLink asChild className={'hover:bg-transparent'}>
                  <Link href={link.path} className="capitalize">{link.element}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}

            <Link href={'/cart'} className="mx-3">
              <div className="flex gap-2">
                <FaShoppingCart /> <span>{cartData?.numOfCartItems}</span>
              </div>
            </Link>

            <Link href={'/wishlist'} className="mx-3">
              <div className="flex gap-2">
                <FaHeart />
              </div>
            </Link>

            <h2>HI {data.user.name}</h2>
            <p className="mx-5 text-red-700" onClick={handleLogOut}>LogOut</p>
          </>
        ) : (
          <>
            {auth.map(link =>
              <NavigationMenuItem key={link.path} className="hidden md:flex bg-transparent">
                <NavigationMenuLink asChild className={'hover:bg-transparent'}>
                  <Link href={link.path} className="capitalize">{link.element}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </>
        )}

      </NavigationMenuList>
    </NavigationMenu>
  )
}