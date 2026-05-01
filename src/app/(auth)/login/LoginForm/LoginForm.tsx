'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import { useRouter } from 'next/navigation' 
import { useState } from "react";
import Loading from "@/app/_components/Loading/Loading";
import { Spinner } from "@/components/ui/spinner"
import { loginSchema, loginSchemaType } from "./schema/login.Schema";
import { loginFn } from "./actions/login.action";
import { signIn } from "next-auth/react";



export default function LoginForm() {
    const [isLoading,setLoading]=useState(false)
    const router = useRouter()
    const {handleSubmit,control,reset} = useForm<loginSchemaType>(
{       
        resolver:zodResolver(loginSchema),
        defaultValues:{
         
         email:'',
         password:'',
         
        }

        }
    );
    
    async function handleLogin(data:loginSchemaType){
        setLoading(true);
    try {

      const isSuccessLogin= await signIn('credentials',{redirect:false,...data})

      console.log(isSuccessLogin);
      
        
        if (isSuccessLogin?.ok) {
          toast.success('login successfully',{
            position:'top-right',
          });
          setTimeout(()=>
            {
            router.push('/')
          },500);
         reset();
        }else {
            toast.error("incorrect email or password",{
                position:'top-right'
            });
        }
    } catch (error:any) {
        toast.success(error?.message,{
             position:'top-right'
        });
    }
    finally{
        setLoading(false)
    }
    }
    
  return (
    <>
        
       <form className="w-2/3 mx-auto my-5" onSubmit={handleSubmit(handleLogin)}>
                  <FieldGroup>
                   
           
             {/* email */}
             <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">
                    email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="email"
                    autoComplete="off"
                    type="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
              {/* password*/}
             <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="password"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            </FieldGroup>
            <Button className="my-5">{isLoading?<Spinner></Spinner>:'Login'}</Button>
       </form>
    </>
  )
} 
