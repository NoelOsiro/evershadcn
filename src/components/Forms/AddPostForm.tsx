import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import TextInputField from "../Text/TextInputFieldProps";
import RadioGroupField from "../Text/RadioGroupField";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


interface AddPostFormValues {
    title: string;
    description: string;
    content: string;
    fullName: string;
    dateOfBirth: string;
    dateOfDeath: string;
    placeOfDeath: string;
    causeOfDeath: string;
    image: File | null;
    postType: string;
}

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().required("Content is required"),
    fullName: Yup.string().required("Full Name of Deceased is required"),
    dateOfBirth: Yup.date().required("Date of Birth is required"),
    dateOfDeath: Yup.date().required("Date of Death is required"),
    placeOfDeath: Yup.string().required("Place of Death is required"),
    causeOfDeath: Yup.string(),
    postType: Yup.string().oneOf(['tribute', 'memorial', 'obituary'], "Post Type is required").required("Post Type is required"),
    image: Yup.mixed().required("Image is required"),
});

export function AddPostForm() {
    const { data: session } = useSession()
    const { toast } = useToast()
    const router = useRouter();
    const [content, setContent] = useState<string>("");
    const radioOptions = [
        { value: 'tribute', label: 'Tribute' },
        { value: 'memorial', label: 'Memorial' },
        { value: 'obituary', label: 'Obituary' }
    ];


    const handleSubmit = async (values: AddPostFormValues, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            let imageBase64 = '';
    
            if (values.image) {
                // Convert image to base64
                imageBase64 = await convertImageToBase64(values.image);
            }
    
            // Prepare form data
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('content', values.content);
            formData.append('fullName', values.fullName);
            formData.append('dateOfBirth', values.dateOfBirth);
            formData.append('dateOfDeath', values.dateOfDeath);
            formData.append('placeOfDeath', values.placeOfDeath);
            formData.append('causeOfDeath', values.causeOfDeath || '');
            formData.append('postType', values.postType);
            formData.append('userId', session?.user?.id || '');
            
            if (values.image) {
                formData.append('image', imageBase64);
            }
    
            // Send request
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
    
            router.push('/my-pages');
        } catch (error) {
            // use toast
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            
            console.error('Error creating post:', error);
        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <Formik
            initialValues={{
                postType: 'tribute',
                description: '',
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
            onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        >
            {({ errors, touched, setFieldValue, isSubmitting }) => (
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
                        <TextInputField name="description" placeholder="Description" label="short description" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInputField name="dateOfBirth" type="date" label="Date of Birth" />
                            <TextInputField name="dateOfDeath" type="date" label="Date of Death" />
                        </div>

                        <TextInputField name="placeOfDeath" placeholder="Enter place of death" label="Place of Death" />
                        <TextInputField name="causeOfDeath" placeholder="Enter cause of death" label="Cause of Death (optional)" />
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Label htmlFor="image" className="text-lg font-semibold">Image</Label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                const file = event.currentTarget.files?.[0];
                                if (file) {
                                    setFieldValue('image', file);
                                }
                            }}
                            className="text-lg p-3 w-full"
                        />
                        {errors.image && touched.image && (
                            <motion.div
                                className="text-red-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {errors.image as string}
                            </motion.div>
                        )}
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button type="submit" className="w-full text-lg py-6 mt-6" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Post...' : 'Create Post'}
                        </Button>
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

const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
