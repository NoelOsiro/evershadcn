import React from 'react';
import { Field, FieldProps } from 'formik';
import { motion } from 'framer-motion';

interface RadioGroupFieldProps {
    name: string;
    options: { value: string; label: string }[];
    label: string;
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, options, label }) => {
    return (
        <div className="space-y-4">
            <label className="text-lg font-semibold">{label}</label>
            <Field name={name}>
                {({ field, form }: FieldProps) => (
                    <>
                        <div className="flex flex-row space-x-2 justify-items-center">
                            {options.map((option) => (
                                <label key={option.value} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        id={option.value}
                                        value={option.value}
                                        checked={field.value === option.value}
                                        onChange={() => form.setFieldValue(name, option.value)}
                                        className="form-radio"
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
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

export default RadioGroupField;
