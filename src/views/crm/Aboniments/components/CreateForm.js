
import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewUser } from 'services/UserService'

import {
    HiUserCircle,
    HiCollection,
    HiCash,
    HiOutlineBell
} from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    abonentID: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    name: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    maxEntries: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    countStartsDays: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const CreateForm = ({ setMessage, message }) => {
    const companyId = useSelector(state => state.auth.user.companyId)
    const token = useSelector((state) => state.auth.session.token)

    async function handleCreateNewCustomer(data) {
        try {
            const response = await createNewUser({ data, companyId }, token);
            setMessage('success')
        } catch (error) {
            setMessage(error?.message)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                   abonentID: '',
                   name: '',
                   price: 0,
                   maxEntries: 0,
                   countStartsDays: 0,
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handleCreateNewCustomer(value)}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="სახელი"
                                invalid={errors.name && touched.name}
                                errorMessage={errors.name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="სახელი"
                                    component={Input}
                                    prefix={<HiUserCircle className="text-xl" />}
                                />
                            </FormItem>
                            <FormItem
                                label="ღირებულება"
                                invalid={errors.price && touched.price}
                                errorMessage={errors.price}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="price"
                                    placeholder="შეიყვანეთ თანხა"
                                    component={Input}
                                    prefix={<HiCash className="text-xl" />}

                                />
                            </FormItem>
                            <FormItem
                                label="ვიზიტების რაოდენობა"
                                invalid={errors.maxEntries && touched.maxEntries}
                                errorMessage={errors.maxEntries}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="maxEntries"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiCollection className="text-xl" />}

                                />
                            </FormItem>
                            <FormItem
                                label="საშეღავათო პერიოდი"
                                invalid={errors.countStartsDays && touched.countStartsDays}
                                errorMessage={errors.countStartsDays}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="countStartsDays"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiOutlineBell className="text-xl" />}

                                />
                            </FormItem>
                            <FormItem>
                                {!message &&
                                    <Button variant="solid" type="submit">
                                        დამატება
                                    </Button>
                                }
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateForm

