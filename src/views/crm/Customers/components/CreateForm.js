
import React, { useState } from 'react'
import { Input, Button, Checkbox, FormItem, FormContainer, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewCostumer } from 'services/CrmService'

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('User Name Required'),
    idCard: Yup.string().max(15, ('too much!'))
        .matches(/^[0-9]{10}$/, 'ID number must be exactly 10 digits'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    mobile: Yup.string().max(12, ('too much!'))
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
    address: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('address Required'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue;
            }
            const date = new Date(originalValue);
            return isNaN(date) ? undefined : date;
        })
        .typeError('Invalid date')
        .required('Date is required')
        .max(new Date(), 'Date cannot be in the future'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('Gender is required'),
})

const CreateForm = () => {

    const userId = useSelector(state => state.auth.user.userId)

    async function handleCreateNewCustomer(data) {
        const myD = {
            firstname: "amara",
            lastname: "bareteli",
            idCard: "69933012114",
            email: "t.bg3aa@mmail.com",
            mobile: 595335245,
            address: "mkutnali 33",
            birthday: "1988-02-12",
            gander: "female"
        }
        try {
            const response = await createNewCostumer({ data, userId })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    idCard: '',
                    email: '',
                    mobile: '',
                    address: '',
                    birthday: '',
                    gander: 'male',
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handleCreateNewCustomer(value)}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="სახელი"
                                invalid={errors.firstName && touched.firstName}
                                errorMessage={errors.firstName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstName"
                                    placeholder="სახელი"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="გვარი"
                                invalid={errors.lastName && touched.lastName}
                                errorMessage={errors.lastName}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastName"
                                    placeholder="გავრი"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="პირადი ნომერი"
                                invalid={errors.idCard && touched.idCard}
                                errorMessage={errors.idCard}
                            >
                                <Field
                                    type="string"
                                    autoComplete="off"
                                    name="idCard"
                                    placeholder="პირადი ნომერი"
                                    component={Input}
                                />
                            </FormItem>

                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="ტელეფონის ნომერი"
                                invalid={errors.mobile && touched.mobile}
                                errorMessage={errors.mobile}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="mobile"
                                    placeholder="ტელეფონის ნომერი"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="მისამართი"
                                invalid={errors.address && touched.address}
                                errorMessage={errors.address}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="მისამართი"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="დაბადების თარიღი"
                                invalid={errors.date && touched.date}
                                errorMessage={errors.date}
                            >
                                <Field
                                    type="date"
                                    autoComplete="off"
                                    name="birthday"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="სქესი"
                                invalid={errors.gander && touched.gander}
                                errorMessage={errors.gander}
                            >
                                <Field
                                    type="radio"
                                    name="gander"
                                    id='male'
                                    value='male'
                                    check={'true'}
                                    component={Radio}
                                    placeholder={'xe'}
                                />
                                <label style={{ margin: '5px 20px 5px 5px' }} >კაცი</label>
                                <Field
                                    type="radio"
                                    name="gander"
                                    id='female'
                                    value='female'
                                    component={Radio}
                                />
                                <label style={{ marginLeft: '5px' }}>ქალი</label>

                            </FormItem>

                            <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateForm

