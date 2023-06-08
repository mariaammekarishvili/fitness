import React from 'react'
import {
    Input,
    Button,
    Notification,
    toast,
    FormContainer,
    Radio
} from 'components/ui'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { components } from 'react-select'
import { putCustomer } from '../../../crm/Users/store/dataSlice'
import {
    HiOutlineMail,
    HiUserCircle,
    HiLocationMarker,
    HiPhone,
    HiCalendar,
    HiIdentification,
} from 'react-icons/hi'
import * as Yup from 'yup'

const { Control } = components

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
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('მეილის ფორმატი არასწორია'),
    mobile: Yup.string().max(12, ('ციფრების რაოდენობა არ უნდა აღემატებოდეს 12-ს'))
        .matches(/^[0-9]{9}$/, 'შეიყვანეთ მხოლოდ ციფრები')
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
        .typeError('  ფორმატი არასწორია')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'მომავალი დროის შეყანა შეუძლებელია'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const Profile = ({ data, userId }) => {
    const dispatch = useDispatch()

    const onFormSubmit = (values, setSubmitting) => {
        dispatch(putCustomer({ data: values, customerID: userId }))

        toast.push(<Notification title={'მონაცემები განახლდა'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={data}
            enableReinitialize
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
                            <FormDesription
                                title="თანამშრომლის ინფორმაცია"
                                desc="განაახლე საკუთარი ინფორმაცია, ქვემოთ მითითებული ველების მიხედვით"
                            />
                            <FormRow
                                name="firstname"
                                label="სახელი"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="firstname"
                                    placeholder="სახელი"
                                    component={Input}
                                    prefix={<HiUserCircle className="text-xl" />}
                                />

                            </FormRow> <FormRow
                                name="lastname"
                                label="გვარი"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="lastname"
                                    placeholder="გვარი"
                                    component={Input}

                                />
                            </FormRow>
                            <FormRow
                                name="idCard"
                                label="პირადი ნომერი"
                                {...validatorProps}
                            >
                                <Field
                                    type="string"
                                    autoComplete="off"
                                    name="idCard"
                                    placeholder="პირადი ნომერი"
                                    component={Input}
                                    prefix={<HiIdentification className="text-xl" />}

                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="Email"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="mobile"
                                label="ტელეფონის ნომერი"
                                {...validatorProps}
                            >
                                <Field
                                    type="string"
                                    autoComplete="off"
                                    name="mobile"
                                    placeholder="ტელეფონის ნომერი"
                                    component={Input}
                                    prefix={<HiPhone className="text-xl" />}

                                />
                            </FormRow>
                            <FormRow
                                name="address"
                                label="მისამართი"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="address"
                                    placeholder="მისამართი"
                                    component={Input}
                                    prefix={<HiLocationMarker className="text-xl" />}

                                />
                            </FormRow>
                            <FormRow
                                name="date"
                                label="დაბადების თარიღი"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="date"
                                    autoComplete="off"
                                    name="birthday"
                                    component={Input}
                                    prefix={<HiCalendar className="text-xl" />}

                                />
                            </FormRow>
                            <FormRow
                                name="gander"
                                label="სქესი"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="radio"
                                    name="gander"
                                    id='male'
                                    value='male'
                                    check={'true'}
                                    component={Radio}
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
                            </FormRow>

                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2 px-4 important"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    ცვლილებების გაუქმება
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'მიმდინარეობს განახლება' : 'შენახვა'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
