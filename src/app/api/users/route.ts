
import { NextResponse } from "next/server";


export function GET(req:NextResponse ){
   
   const users=[
    {id:1, name:'ali'},
    {id:2, name:'ahmed'},
   ]


    return NextResponse.json({users,status:200})
}