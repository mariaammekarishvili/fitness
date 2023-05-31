import React from 'react'
import classNames from 'classnames'
import {
    Input,
    Button,
    Tag,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import FormDesription from './FormDesription'
import { useDispatch } from 'react-redux'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import isLastChild from 'utils/isLastChild'
import { putCustomer } from '../../../crm/CustomerDetail/store/dataSlice'

import {
    HiOutlineDesktopComputer,
    HiOutlineDeviceMobile,
    HiOutlineDeviceTablet,
} from 'react-icons/hi'
import dayjs from 'dayjs'
import * as Yup from 'yup'

const LoginHistoryIcon = ({ type }) => {
    switch (type) {
        case 'Desktop':
            return <HiOutlineDesktopComputer />
        case 'Mobile':
            return <HiOutlineDeviceMobile />
        case 'Tablet':
            return <HiOutlineDeviceTablet />
        default:
            return <HiOutlineDesktopComputer />
    }
}

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Enter your new password')
        .min(6, 'სიმბოლოების რაოდენობა უნდა აღემატებოდეს 6ს')
        .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
    confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'პაროლი არ ემთხვევა'
    ),
})

const Password = ({ data, userId }) => {
    const dispatch = useDispatch()

    const onFormSubmit = (values, setSubmitting) => {
        dispatch(putCustomer({ data: values, customerID: userId }))

        toast.push(<Notification title={'Password updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <>
            <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormRow
                                    name="password"
                                    label="ახალი პაროლი"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="ახალი პაროლი"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="confirmNewPassword"
                                    label="დაადასტურე პაროლი"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="confirmNewPassword"
                                        placeholder="პაროლი"
                                        component={Input}
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        className="ltr:mr-2 rtl:ml-2"
                                        type="button"
                                        onClick={resetForm}
                                    >
                                        გაუქმება
                                    </Button>
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? 'მიმდინარეობს განახლება'
                                            : 'პაროლის შეცვა'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Password
