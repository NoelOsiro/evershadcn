'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'


export function Checkout({ postId, amount }: { postId: string, amount: number }) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phoneNumber, postId }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Payment Initiated",
          description: "Please check your phone for the M-Pesa prompt.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error initiating the payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="254XXXXXXXXX"
          required
        />
      </div>
      <Button type="submit">Pay {amount} KES</Button>
    </form>
  )
}