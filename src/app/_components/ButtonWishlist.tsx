'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { addToWishlist } from '@/apis/wishlist/actions/addToWishlist.action'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  id: string
  children: ReactNode
  cls: string
}


export default function WishlistButton({ id, children, cls }: Props) {


    const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (res) => {
      if (res?.error) {
        toast.error(res.error)
      } else {
        toast.success("Added to wishlist")
         queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      }
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  })

  return (
    <Button onClick={() => mutate(id)} className={cls}>
      {children}
    </Button>
  )
}