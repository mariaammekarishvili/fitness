import React, { useEffect, useState } from 'react'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    Alert,
    Dialog,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewSale } from 'services/Sales'

import { HiPencil, HiUserGroup } from 'react-icons/hi'
import CustomerCreateForm from 'views/crm/Customers/components/CustomerCreateForm'

const validationSchema = Yup.object().shape({
    customerID: Yup.string(),
    // .required('ინფორმაციის შეყვანა სავალდებულოა'),
    trainerID: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა'),
    // .required('ინფორმაციის შეყვანა სავალდებულოა'),
    abonimentID: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    workoutID: Yup.array(),
    abonimentCount: Yup.number()
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    abonimentCountDays: Yup.number()
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    countPersonalStartsDays: Yup.number()
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const CreateForm = ({
    setMessage,
    trainerList,
    abonimentList,
    customerList,
    workoutList,
    message,
}) => {
    const companyId = useSelector((state) => state.auth.user.companyId)

    const token = useSelector((state) => state.auth.session.token)

    const [openUserPopup, setOpenUserPopup] = useState(false)

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setOpenUserPopup(false)
    }

    const [createdUser, setCreatedUser] = useState()
    const [createCustomerMessage, setCreateCustomerMessage] = useState('')

    useEffect(() => {
        if (createCustomerMessage) {
            const timeout = setTimeout(() => {
                setOpenUserPopup(false)
            }, 1000)
            const timeoutMess = setTimeout(() => {
                setCreateCustomerMessage('')
            }, 2000)
            // Clean up
            // Clean up the timeout when the component unmounts or when the effect is re-triggered
            return () => {
                clearTimeout(timeout)
                clearTimeout(timeoutMess)
            }
        }
    }, [createCustomerMessage])

    async function handleCreateNewCustomer(data) {
        try {
            if (data.workoutID.length) {
                const selectedValues = data.workoutID.map(
                    (option) => option.value
                )
                data.workoutID = selectedValues
            }
            if (createdUser) {
                data.customerID = createdUser.customerID
            }
            const response = await createNewSale({ data, companyId }, token)
            setMessage('success')
        } catch (error) {
            setMessage(error?.message)
        }
    }

    return (
        <div className="max-h-[490px] overflow-y-auto">
            <Formik
                initialValues={{
                    abonimentID: '',
                    customerID: '',
                    trainerID: '',
                    workoutID: [],
                    abonimentCount: 0,
                    countPersonalStartsDays: 0,
                    abonimentCountDays: 0
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handleCreateNewCustomer(value)}
            >
                {({ touched, errors, values, resetForm }) => (
                    <Form>
                        <FormContainer>
                            {createdUser && (
                                <p className="font-bold heading-text my-[15px]">
                                    მომხმარებელი: <br />{' '}
                                    {createdUser?.firstname}{' '}
                                    {createdUser.lastname} პ/ნ:{' '}
                                    {createdUser.idCard}
                                </p>
                            )}

                            {!createdUser && (
                                <>
                                    <FormItem
                                        label="აირჩიეთ მომხმარებელი"
                                        invalid={
                                            errors.customerID &&
                                            touched.customerID
                                        }
                                        errorMessage={errors.customerID}
                                    >
                                        <Field name="customerID">
                                            {({ field, form }) => (
                                                <Select
                                                    field={field}
                                                    form={form}
                                                    options={customerList}
                                                    placeholder={
                                                        'ჩაწერეთ სახელი'
                                                    }
                                                    value={values.select}
                                                    onChange={(option) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            option.value
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <Button
                                        className="mb-[20px] mt-[-15px]"
                                        variant="twoTone"
                                        onClick={() => setOpenUserPopup(true)}
                                    >
                                        + მომხმარებლის დამატება
                                    </Button>
                                </>
                            )}
                            <Dialog
                                isOpen={openUserPopup}
                                onClose={onDialogClose}
                                onRequestClose={onDialogClose}
                            >
                                <div className="add-form-div">
                                    <CustomerCreateForm
                                        setMessage={setCreateCustomerMessage}
                                        message={createCustomerMessage}
                                        setCreatedUser={setCreatedUser}
                                        formSale
                                    />
                                </div>
                            </Dialog>
                            {createCustomerMessage && (
                                <Alert
                                    className="mb-4 respons-notf"
                                    type={
                                        createCustomerMessage === 'success'
                                            ? 'success'
                                            : 'danger'
                                    }
                                    showIcon
                                >
                                    {createCustomerMessage === 'success'
                                        ? 'მომხმარებელი წარმატებით დაემატა'
                                        : createCustomerMessage}
                                </Alert>
                            )}
                            <FormItem
                                label="აირჩიეთ ტრენერი"
                                invalid={errors.trainerID && touched.trainerID}
                                errorMessage={errors.trainerID}
                            >
                                <Field name="trainerID">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={trainerList}
                                            placeholder={'ჩაწერეთ სახელი'}
                                            value={values.select}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="აირჩიეთ აბონიმენტი"
                                invalid={
                                    errors.abonimentID && touched.abonimentID
                                }
                                errorMessage={errors.abonimentID}
                            >
                                <Field name="abonimentID">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={abonimentList}
                                            placeholder={'ჩაწერეთ სახელი'}
                                            value={values.select}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option.value
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="სავარჯიშო ჯგუფი"
                                invalid={Boolean(
                                    errors.workoutID && touched.workoutID
                                )}
                                errorMessage={errors.workoutID}
                            >
                                <Field name="workoutID">
                                    {({ field, form }) => (
                                        <Select
                                            isMulti
                                            field={field}
                                            form={form}
                                            options={workoutList}
                                            placeholder={
                                                'ჩაწერეთ ჯგუფის სახელი'
                                            }
                                            value={values.workoutID}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label="მოქმედების ვადა (თვეების რაოდენობა)"
                                invalid={
                                    errors.abonimentCount &&
                                    touched.abonimentCount
                                }
                                errorMessage={errors.abonimentCount}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="abonimentCount"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiUserGroup className="text-xl" />}
                                />
                            </FormItem>
                            <h4 className='mb-[10px] mt-[-5px]'>ან</h4>
                            <FormItem
                                label="მოქმედების ვადა (დღეების რაოდენობა)"
                                invalid={
                                    errors.abonimentCountDays &&
                                    touched.abonimentCountDays
                                }
                                errorMessage={errors.abonimentCountDays}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="abonimentCountDays"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiUserGroup className="text-xl" />}
                                />
                            </FormItem>
                            <FormItem
                                label="ინდივიდუალური საშეღავათო პერიოდი"
                                invalid={
                                    errors.countPersonalStartsDays &&
                                    touched.countPersonalStartsDays
                                }
                                errorMessage={errors.countPersonalStartsDays}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="countPersonalStartsDays"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiUserGroup className="text-xl" />}
                                />
                            </FormItem>
                            <FormItem>
                                <Button variant={'solid'} type="submit">
                                    დამატება
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
