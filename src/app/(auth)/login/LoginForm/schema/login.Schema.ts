import * as zod from "zod";

export const loginSchema = zod.object({
  
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
    
    

})

export type loginSchemaType =zod.infer<typeof loginSchema>
