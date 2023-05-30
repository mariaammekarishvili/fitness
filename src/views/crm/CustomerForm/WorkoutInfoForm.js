import React, { useState } from 'react'
import { Input, FormItem, Checkbox } from 'components/ui'
import {
    HiCash,
    HiPencil,
    HiUserGroup,
    HiClock
} from 'react-icons/hi'

import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors, type } = props

    const [weekDays, setWeekDays] = useState([]);

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

    return (
        <>
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

            {/* <FormItem label='სავარჯიშო დღეები'
             invalid={errors.weekDays && touched.weekDays}
             errorMessage={errors.weekDays}
            >
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
            </FormItem> */}
        </>
    )
}

export default PersonalInfoForm
