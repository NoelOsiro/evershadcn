'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useContributionsStore } from "@/store/contributionsStore";

// Validation schema using Yup
const ContributionSchema = Yup.object().shape({
  channel: Yup.string().required("Please select a payment channel"),
  account_no: Yup.string().required("Account number is required"),
});

interface ContributionFormProps {
  postId: string;
}

const ContributionForm = ({ postId }: ContributionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const postContribution = useContributionsStore((state) => state.postContribution);

  const handleSubmit = async (values: { channel: string; account_no: string }) => {
    try {
      // Post contribution with postId
      await postContribution( postId,values.channel,values.account_no, );
      setIsOpen(false); // Close the dialog after submission
    } catch (error) {
      console.error('Error submitting contribution:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-400 mb-4">Add contribution</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-primary bg-primary-foreground">
        <DialogHeader>
          <DialogTitle>Add contribution channel</DialogTitle>
          <DialogDescription>
            Fill in the details below to add your contribution channel.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={{ channel: '', account_no: '' }}
          validationSchema={ContributionSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Channel (Radio Buttons) */}
              <div className="grid gap-4">
                <Label htmlFor="channel">Select Payment Channel</Label>
                <div role="group" aria-labelledby="channel" className="space-x-4 flex">
                  <div>
                    <Field type="radio" id="mpesa" name="channel" value="Mpesa" />
                    <Label htmlFor="mpesa" className="ml-2">Mpesa</Label>
                  </div>
                  <div>
                    <Field type="radio" id="airtel" name="channel" value="Airtel Money" />
                    <Label htmlFor="airtel" className="ml-2">AirtelMoney</Label>
                  </div>
                  <div>
                    <Field type="radio" id="postapay" name="channel" value="Postapay" />
                    <Label htmlFor="postapay" className="ml-2">Postapay</Label>
                  </div>
                </div>
                <ErrorMessage name="channel" component="div" className="text-red-500" />
              </div>

              {/* Account Number */}
              <div className="grid gap-4">
                <Label htmlFor="account_no">Account Number</Label>
                <Field
                  type="text"
                  name="account_no"
                  placeholder="Enter account number"
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <ErrorMessage name="account_no" component="div" className="text-red-500" />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Save changes"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ContributionForm;
