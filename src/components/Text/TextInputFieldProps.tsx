import React from 'react';
import { Field, FieldProps } from 'formik';
import { motion } from 'framer-motion';


interface TextInputFieldProps {
    name: string;
    type?: string;
    placeholder?: string;
    label: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({ name, type = 'text', placeholder, label }) => {
    return (
        <div className="space-y-4">
            <label htmlFor={name} className="text-lg font-semibold">{label}</label>
            <Field name={name}>
                {({ field, form }: FieldProps) => (
                    <>
                        <input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className="text-lg p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-500"
                            {...field}
                        />
                        {form.errors[name] && form.touched[name] && (
                            <motion.div
                                className="text-red-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {form.errors[name].toString()}
                            </motion.div>
                        )}
                    </>
                )}
            </Field>
        </div>
    );
};

export default TextInputField;
