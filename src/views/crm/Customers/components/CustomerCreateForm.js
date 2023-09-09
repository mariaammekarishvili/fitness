import React from 'react'
import { Input, Button, FormItem, FormContainer, Radio } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewCustomer } from 'services/CrmService'

import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCalendar,
    HiIdentification,
    HiPencilAlt,
} from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    lastname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    idCard: Yup.string()
        .min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('მეილის ფორმატი არასწორია'),
    mobile: Yup.string()
        .max(12, 'ციფრების რაოდენობა არ უნდა აღემატებოდეს 12-ს')
        .matches(/^[0-9]{9}$/, 'შეიყვანეთ მხოლოდ ციფრები')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue
            }
            const date = new Date(originalValue)
            return isNaN(date) ? undefined : date
        })
        .typeError('  ფორმატი არასწორია')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'მომავალი დროის შეყანა შეუძლებელია'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    turniketCode: Yup.string()
        .min(7, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const CustomerCreateForm = ({
    setMessage,
    message,
    setCreatedUser,
    formSale,
}) => {
    const companyId = useSelector((state) => state.auth.user.companyId)
    const token = useSelector((state) => state.auth.session.token)

    async function handleCreateNewCustomer(data) {
        try {
            const response = await createNewCustomer({ data, companyId }, token)
            setMessage('success')
            if (formSale) {
                setCreatedUser(response)
            }
        } catch (error) {
            setMessage(error?.message)
        }
    }

    return (
        <div className="max-h-[490px] overflow-y-auto">
            <h3 className="mb-[15px]">ახალი მომხმარებლის დამატება</h3>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    idCard: '',
                    email: '',
                    mobile: '',
                    address: '',
                    birthday: '',
                    gander: 'male',
                    turniketCode: '',
                    // nickname: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handleCreateNewCustomer(value)}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="სახელი"
                                invalid={errors.firstname && touched.firstname}
                                errorMessage={errors.firstname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstname"
                                    placeholder="სახელი"
                                    component={Input}
                                    prefix={
                                        <HiUserCircle className="text-xl" />
                                    }
                                />
                            </FormItem>
                            {/* <FormItem
                                label="ნიკნეიმი"
                                invalid={errors.nickname && touched.nickname}
                                errorMessage={errors.nickname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="nickname"
                                    placeholder="ნიკნეიმი"
                                    component={Input}
                                    prefix={
                                        <HiUserCircle className="text-xl" />
                                    }
                                />
                            </FormItem> */}
                            <FormItem
                                label="გვარი"
                                invalid={errors.lastname && touched.lastname}
                                errorMessage={errors.lastname}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastname"
                                    placeholder="გვარი"
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
                                    prefix={
                                        <HiIdentification className="text-xl" />
                                    }
                                />
                            </FormItem>
                            <FormItem
                                label="ბარათის ID"
                                invalid={
                                    errors.turniketCode && touched.turniketCode
                                }
                                errorMessage={errors.turniketCode}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="turniketCode"
                                    placeholder="შეიყვანეთ კოდი"
                                    component={Input}
                                    prefix={<HiPencilAlt className="text-xl" />}
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
                                    prefix={<HiMail className="text-xl" />}
                                />
                            </FormItem>
                            <FormItem
                                label="ტელეფონის ნომერი"
                                invalid={errors.mobile && touched.mobile}
                                errorMessage={errors.mobile}
                            >
                                <Field
                                    type="string"
                                    autoComplete="off"
                                    name="mobile"
                                    placeholder="ტელეფონის ნომერი"
                                    component={Input}
                                    prefix={<HiPhone className="text-xl" />}
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
                                    prefix={
                                        <HiLocationMarker className="text-xl" />
                                    }
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
                                    prefix={<HiCalendar className="text-xl" />}
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
                                    id="male"
                                    value="male"
                                    check={'true'}
                                    component={Radio}
                                />
                                <label style={{ margin: '5px 20px 5px 5px' }}>
                                    კაცი
                                </label>
                                <Field
                                    type="radio"
                                    name="gander"
                                    id="female"
                                    value="female"
                                    component={Radio}
                                />
                                <label style={{ marginLeft: '5px' }}>
                                    ქალი
                                </label>
                            </FormItem>

                            <FormItem>
                                {!message && (
                                    <Button variant="solid" type="submit">
                                        დამატება
                                    </Button>
                                )}
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CustomerCreateForm
