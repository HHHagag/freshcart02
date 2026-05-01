'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form"
import { registerSchema, registerSchemaType } from "../schema/register.shema";
import { registerFn } from "../actions/register.action";
import { toast } from "sonner";
import { useRouter } from 'next/navigation' 
import { useState } from "react";
import Loading from "@/app/_components/Loading/Loading";
import { Spinner } from "@/components/ui/spinner"



export default function RegisterForm() {
    const [isLoading,setLoading]=useState(false)
    const router = useRouter()
    const {handleSubmit,control,reset} = useForm<registerSchemaType>(
{       
        resolver:zodResolver(registerSchema),
        defaultValues:{
         name:'',
         email:'',
         password:'',
         rePassword :'',
         phone:'',
        }

        }
    );
    
    async function handleRegister(data:registerSchemaType){
        setLoading(true)
    try {
        const isSuccessRegister = await registerFn(data); 
        if(isSuccessRegister){
          toast.success('user created successfully',{
            position:'top-right'
          })
          setTimeout(()=>
            {
            router.push('/login')
          },500);
         reset() 
        }
    } catch (error:any) {
        toast.error(error?.message,{
             position:'top-right'
        });
    }
    finally{
        setLoading(false)
    }
    }
    
  return (
    <>
        
       <form className="w-2/3 mx-auto my-5" onSubmit={handleSubmit(handleRegister)}>
                  <FieldGroup>
                    {/* name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />
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

             {/* repassword*/}
             <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rePassword ">
                    rePassword 
                  </FieldLabel>
                  <Input
                    {...field}
                    id="rePassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="rePassword"
                    autoComplete="off"
                    type="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* phone*/}
             <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">
                    phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="phone"
                    autoComplete="off"
                    type="tel"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            </FieldGroup>
            <Button className="my-5">{isLoading?<Spinner></Spinner>:'Register'}</Button>
       </form>
    </>
  )
} 
