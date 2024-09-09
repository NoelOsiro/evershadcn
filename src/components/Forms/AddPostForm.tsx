
import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';
import { Formik,Form,FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import TextInputField from "../Text/TextInputFieldProps";
import RadioGroupField from "../Text/RadioGroupField";

interface AddPostFormValues {
    title: string;
    content: string;
    fullName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    placeOfDeath: string;
    causeOfDeath: string;
    image: File | null;
    postType: 'tribute' | 'memorial' | 'obituary' | undefined; // Added postType
}

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    fullName: Yup.string().required("Full Name of Deceased is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    dateOfDeath: Yup.date().required("Date of Death is required"),
    placeOfDeath: Yup.string().required("Place of Death is required"),
    causeOfDeath: Yup.string(),
    postType: Yup.string().oneOf(['tribute', 'memorial', 'obituary'], "Post Type is required").required("Post Type is required"), // Added postType validation
});


export function AddPostForm() {
    const [content, setContent] = useState<string>("");
    const radioOptions = [
        { value: 'tribute', label: 'Tribute' },
        { value: 'memorial', label: 'Memorial' },
        { value: 'obituary', label: 'Obituary' }
    ];

    return (
        <Formik
            initialValues={{
                postType: 'tribute',
                title: '',
                content: '',
                fullName: '',
                dateOfBirth: '',
                dateOfDeath: '',
                placeOfDeath: '',
                causeOfDeath: '',
                image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Handle form submission
                console.log(values.content);
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-8">
                    <RadioGroupField name="postType" options={radioOptions} label="Post Type" />


                    <TextInputField name="title" placeholder="Enter title" label="Title" />

                    {PostContent(content, setContent, setFieldValue, errors, touched)}

                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.5 }}
                    >
                        <TextInputField name="fullName" placeholder="Enter full name" label="Full Name of Deceased" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInputField name="dateOfBirth" type="date" label="Date of Birth" />
                            <TextInputField name="dateOfDeath" type="date" label="Date of Death" />
                        </div>

                        <TextInputField name="placeOfDeath" placeholder="Enter place of death" label="Place of Death" />
                        <TextInputField name="causeOfDeath" placeholder="Enter cause of death" label="Cause of Death (optional)" />

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button type="submit" className="w-full text-lg py-6 mt-6">Create Post</Button>
                    </motion.div>
                </Form>
            )}
        </Formik>
    );
}

function PostContent(
    content: string,
    setContent: (value: SetStateAction<string>) => void,
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<AddPostFormValues>>,
    errors: FormikErrors<AddPostFormValues>,
    touched: FormikTouched<AddPostFormValues>
) {
    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <Label htmlFor="content" className="text-lg font-semibold">Content</Label>
            <div className="h-96">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(value) => {
                        setContent(value);
                        setFieldValue('content', value);
                    }}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, true] }],
                            ['bold', 'italic', 'underline'],
                            ['link'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['clean']
                        ],
                    }}
                    className="h-80"
                />
            </div>
            {errors.content && touched.content && (
                <motion.div
                    className="text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {errors.content}
                </motion.div>
            )}
        </motion.div>
    );
}


