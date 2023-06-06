
import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewSale } from 'services/Sales'
import { fetchTrainerList } from 'services/TrainerService'
import { fetchList as workoutFetch } from 'services/WorkoutService'
import { fetchList as abonimentFetch } from 'services/AbonimentService'
import { fetchCustomers } from 'services/CrmService'
import CreatableSelect from 'react-select/creatable'

import {
    HiPencil,
    HiUserGroup,
} from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    turniketCode: Yup.string()
        .min(7, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    customerID: Yup.string()
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    trainerID: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    abonimentID: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    workoutID: Yup.array().required('ინფორმაციის შეყვანა სავალდებულოა'),
    abonimentCount: Yup.string()
        .max(5, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

const CreateForm = ({ setMessage, message }) => {
    const companyId = useSelector(state => state.auth.user.companyId)

    const token = useSelector((state) => state.auth.session.token)

    const [trainerList, setTrenerList] = useState([]);
    const [abonimentList, setAbonimentList] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);

    useEffect(() => {
        const fetchTrainer = async () => {
            const data = await fetchTrainerList({ companyId }, token);
            if (data) {
                setTrenerList(data)
            }
        };

        const fetchAboniment = async () => {
            const data = await abonimentFetch({ companyId }, token);
            if (data) {
                setAbonimentList(data);
            }
        };

        const fetchWorkout = async () => {
            const data = await workoutFetch({ companyId }, token);
            if (data) {
                const updatedWorkoutList = data.map((workout) => ({
                    value: workout.workoutID,
                    label: workout.name,
                }));

                setWorkoutList([...workoutList, ...updatedWorkoutList]);
            }
        };

        const fetchCustomersList = async () => {
            const data = await fetchCustomers({ companyId }, token);
            if (data) {
                setCustomerList(data);
            }
        };

        fetchAboniment();
        fetchWorkout();
        fetchCustomersList();
        fetchTrainer();
    }, []);

    async function handleCreateNewCustomer(data) {
        try {
            const selectedValues = data.workoutID.map((option) => option.value);
            data.workoutID = selectedValues
            const response = await createNewSale({ data, companyId }, token);
            setMessage('success')
        } catch (error) {
            setMessage(error?.message)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    turniketCode: '',
                    abonimentID: '',
                    customerID: '',
                    trainerID: [],
                    workoutID: '',
                    abonimentCount: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handleCreateNewCustomer(value)}
            >
                {({ touched, errors, values, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="ტურნიკეტის კოდი"
                                invalid={errors.turniketCode && touched.turniketCode}
                                errorMessage={errors.turniketCode}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="turniketCode"
                                    placeholder="შეიყვანეთ კოდი"
                                    component={Input}
                                    prefix={<HiPencil className="text-xl" />}
                                />
                            </FormItem>
                            <FormItem label='აირჩიეთ კლიენტი' invalid={errors.customerID && touched.customerID}
                                errorMessage={errors.customerID}>
                                <Field
                                    as="select"
                                    name="customerID"
                                    type='select'
                                    autoComplete="off"
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-base appearance-none"
                                >
                                    <option value="">დააჭირეთ ასარჩევად</option>
                                    {customerList.map((customer) => (
                                        <option key={customer?.customerID} value={customer?.customerID} style={{ fontSize: '16px', borderBottom: 'solid black 1px' }}
                                        >
                                            {customer?.firstname} {customer?.lastname} / პ.ნ: {customer?.idCard}
                                        </option>))
                                    }
                                </Field>
                            </FormItem>

                            <FormItem label='აირჩიეთ ტრენერი' invalid={errors.trainerID && touched.trainerID}
                                errorMessage={errors.trainerID}>
                                <Field
                                    as="select"
                                    name="trainerID"
                                    type='select'
                                    autoComplete="off"
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">დააჭირეთ ასარჩევად</option>
                                    {trainerList.map((user) => (
                                        <option key={user?.trainerID} value={user?.trainerID} style={{ fontSize: '16px', borderBottom: 'solid black 1px' }}>
                                            {user?.firstname} {user?.lastname} / პ.ნ: {user?.idCard}
                                        </option>
                                    ))}
                                </Field>
                            </FormItem>
                            <FormItem label='აირჩიეთ აბონიმენტი' invalid={errors.abonimentID && touched.abonimentID}
                                errorMessage={errors.abonimentID}>
                                <Field
                                    as="select"
                                    name="abonimentID"
                                    type='select'
                                    autoComplete="off"
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">დააჭირეთ ასარჩევად</option>
                                    {abonimentList.map((aboniment) => (
                                        <option key={aboniment?.abonimentID} value={aboniment?.abonimentID} style={{ fontSize: '16px', borderBottom: 'solid black 1px' }}>
                                            {aboniment?.name}
                                        </option>
                                    ))}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="სავარჯიშო ჯგუფი"
                                invalid={Boolean(
                                    errors.workoutID &&
                                    touched.workoutID
                                )}
                                errorMessage={errors.workoutID}
                            >
                                <Field name="workoutID">
                                    {({ field, form }) => (
                                        <Select
                                            componentAs={CreatableSelect}
                                            isMulti
                                            field={field}
                                            form={form}
                                            options={workoutList}
                                            value={values.workoutID}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option,
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                label="მოქმედების ვადა"
                                invalid={errors.abonimentCount && touched.abonimentCount}
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
                            <FormItem>
                                <Button variant={"solid"} type="submit">
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

