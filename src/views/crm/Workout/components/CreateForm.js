
import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, Radio, Checkbox, Select } from 'components/ui'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { createNewUser } from 'services/WorkoutService'
import { fetchTrainerList } from 'services/TrainerService'

import {
    HiUserCircle,
    HiCollection,
    HiCash,
    HiPencil,
    HiUserGroup,
    HiClock,
} from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    capacity: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    timeOfTheDay: Yup.string().required('Time is required').matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'ფორმატი არასწორია, (მაგალითად: 22:00)'),

    weekDays: Yup.array()
        .min(1, 'Select at least one week day'),
    // .required('ერთი დღე მაინც უნდა იყოს მონიშნული'),
})

const CreateForm = ({ setMessage, message }) => {
    const companyId = useSelector(state => state.auth.user.companyId)

    const token = useSelector((state) => state.auth.session.token)

    const [weekDays, setWeekDays] = useState([]);

    const [trainerList, setTrenerList] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState('');
    const [trainerId, setTrainerId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchTrainerList({ companyId }, token);
            if (data) {
                setTrenerList(data)
            }
        };
        fetchData();
    }, [])

    const daysOfWeek = {
        sunday: 'კვირა',
        monday: 'ორშაბათი',
        tuesday: 'სამშაბათი',
        wednesday: 'ოთხშაბათი',
        thursday: 'ხუთშაბათი',
        friday: 'პარასკევი',
        saturday: 'შაბათი',
    };

    const handleCheckboxChange = (day) => {
        if (weekDays.includes(day)) {
            setWeekDays(weekDays.filter((d) => d !== day));
        } else {
            setWeekDays([...weekDays, day]);
        }
    };

    const handleTrainerChange = (event) => {
        const selectedId = event.target.value
        const selectedObj = trainerList.find(user => user.trainerID == selectedId);
        setSelectedTrainer(selectedObj);
        setTrainerId(selectedId)
    };

    async function handleCreateNewCustomer(data) {
        data.weekDays = weekDays;
        try {
            const response = await createNewUser({ data, companyId: trainerId }, token);
            setMessage('success')
        } catch (error) {
            setMessage(error?.message)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    price: '',
                    maxEntries: '',
                    capacity: '',
                    timeOfTheDay: '',
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
                                    prefix={<HiPencil className="text-xl" />}
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
                                label="წევრების მაქსიმალური რაოდენობა"
                                invalid={errors.capacity && touched.capacity}
                                errorMessage={errors.capacity}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="capacity"
                                    placeholder="შეიყვანეთ"
                                    component={Input}
                                    prefix={<HiUserGroup className="text-xl" />}

                                />
                            </FormItem>

                            <FormItem label="აირჩიეთ დაწყების დრო"
                                invalid={errors.timeOfTheDay && touched.timeOfTheDay}
                                errorMessage={errors.timeOfTheDay}
                            >
                                 <Field
                                    type="text"
                                    autoComplete="off"
                                    name="timeOfTheDay"
                                    placeholder="12:00"
                                    component={Input}
                                    prefix={<HiClock className="text-xl" />}

                                />
                            </FormItem>

                            <FormItem label='ტრენერს არჩევა'>
                                <select
                                    id="userSelect"
                                    value={selectedTrainer ? selectedTrainer.trainerID : ''}
                                    onChange={handleTrainerChange}
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="">Select...</option>
                                    {trainerList.map((user) => (
                                        <option key={user?.trainerID} value={user?.trainerID}>
                                            {user?.firstname} {user?.lastname} {user?.idCard}
                                        </option>
                                    ))}
                                </select>
                            </FormItem>

                            <FormItem label='სავარჯიშო დღეები'>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {Object.entries(daysOfWeek).map(([day, label]) => (
                                        <label key={day}>
                                            <Checkbox
                                                type="checkbox"
                                                name="weekDays"
                                                value={day}
                                                // component={Checkbox}
                                                checked={weekDays.includes(day)}
                                                onChange={() => handleCheckboxChange(day)}
                                            />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </FormItem>
                            <FormItem>
                                {!message && selectedTrainer && weekDays &&
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

