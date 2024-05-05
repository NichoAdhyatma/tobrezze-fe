"use client"

import { z } from "zod"

export const authFormSchemaSignIn = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8)
})


export const authFormSchemaSignUp = z.object({
  name: z.string().min(4).max(50),
  email: z.string().min(8).max(50),
  password: z.string().min(8)
})
