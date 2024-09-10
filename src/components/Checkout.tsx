'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'

export function Checkout({ postId, amount }: { postId: string, amount: number }) {
  const { toast } = useToast()

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{9,12}$/, 'Phone number must be between 9 and 12 digits'),
    paymentMethod: Yup.string().required('Payment method is required'),
  })

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      paymentMethod: 'mpesa', // Default payment method
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('/api/initiate-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, phoneNumber: values.phoneNumber, postId, paymentMethod: values.paymentMethod }),
        })

        const data = await response.json()

        if (data.success) {
          toast({
            title: 'Payment Initiated',
            description: 'Please check your phone for the payment prompt.',
          })
        } else {
          throw new Error(data.error)
        }
      } catch (error) {
        toast({
          title: 'Payment Failed',
          description: 'There was an error initiating the payment. Please try again.',
          variant: 'destructive',
        })
      }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <RadioGroup
          id="paymentMethod"
          value={formik.values.paymentMethod}
          onChange={(value) => formik.setFieldValue('paymentMethod', value)}
          className='flex space-x-4'
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mpesa" id="r3" />
            <Label htmlFor="r3">M-pesa</Label>
          </div>

          <RadioGroupItem value="M-pesa" id="M-pesa" />
          <RadioGroupItem value="Credit_card" id="Credit Card" />
        </RadioGroup>
        {formik.errors.paymentMethod && formik.touched.paymentMethod && (
          <div className="text-red-500 text-sm">{formik.errors.paymentMethod}</div>
        )}
      </div>

      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          {...formik.getFieldProps('phoneNumber')}
          placeholder="254XXXXXXXXX"
          className={formik.errors.phoneNumber && formik.touched.phoneNumber ? 'border-red-500' : ''}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
        )}
      </div>

      <Button type="submit">Pay {amount} KES</Button>
    </form>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
