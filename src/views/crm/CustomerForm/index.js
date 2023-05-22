import React, { useState, forwardRef, useEffect } from 'react'
import { Tabs, Dialog, FormContainer, Button } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { ValidationSchemaCustomer, ValidationSchemaTrainer } from './ValidationSchema'
dayjs.extend(customParseFormat)

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    lastname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    idCard: Yup.string().min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'), email: Yup.string().email('Invalid email').required('Email Required'),
    mobile: Yup.string().max(12, ('too much!'))
        .matches(/^[0-9]{9}$/, 'Mobile number must be exactly 9 digits')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue;
            }
            const date = new Date(originalValue);
            return isNaN(date) ? undefined : date;
        })
        .typeError('Invalid date')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'Date cannot be in the future'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit, type } = props

    const valuesForCustomers = {
        firstname: customer.firstname || '',
        lastname: customer.lastname || '',
        idCard: customer.idCard || '',
        email: customer.email || '',
        mobile: customer.mobile || '',
        address: customer.address || '',
        birthday: customer.birthday || '',
        gander: customer.gander || '',
    }

    const valuesForTrainer = {
        firstname: customer.firstname || '',
        lastname: customer.lastname || '',
        idCard: customer.idCard || '',
        mobile: customer.mobile || '',
        address: customer.address || '',
        birthday: customer.birthday || '',
        gander: customer.gander || '',
        price: customer.price || '',
        email: customer.email || '',

    }

    const [validationSchema, setValidationSchema] = useState()

    useEffect(() => {
        if (type === 'customer') {
            setValidationSchema(ValidationSchemaCustomer)
        } else if (type === 'trainer') {
            setValidationSchema(ValidationSchemaTrainer)
        }
    }, [])


    return (
        <Formik
            innerRef={ref}
            initialValues={valuesForTrainer}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>

                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    პრიადი ინფორმაცია
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                        type={type}
                                    />
                                </TabContent>
                                {/* <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent> */}
                            </div>
                        </Tabs>
                    </FormContainer>

                </Form>
            )}
        </Formik>
    )
})

export default CustomerForm
