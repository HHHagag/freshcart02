import * as zod from "zod";

export const registerSchema = zod.object({
  name: zod
    .string()
    .nonempty("this is required")
    .min(2, "min 2 char")
    .max(10, "max 10 chars"),
  email: zod.string().nonempty("this is required").email("invalid email"),
  password: zod
    .string()
    .nonempty("this is required")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      `Minimum 8 characters
At least 1 uppercase letter (A–Z)
At least 1 lowercase letter (a–z)
At least 1 number (0–9)
At least 1 special character (#?!@$%^&*-)`,
    ),
    rePassword: zod
    .string()
    .nonempty("this is required"),
    phone: zod
    .string()
    .nonempty("this is required").regex(/^01[0125]\d{8}$/,'invalid phone number'),
}).refine((data)=>data.password==data.rePassword,{
     message: 'rePassword must match password',
    path:['rePassword']
})

export type registerSchemaType =zod.infer<typeof registerSchema>
