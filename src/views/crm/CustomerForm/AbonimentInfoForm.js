import React from 'react'
import { Input, FormItem } from 'components/ui'
import {
    HiUserCircle,
    HiCash,
    HiOutlineBell,
    HiCollection
} from 'react-icons/hi'

import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors, type } = props

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
        </>
    )
}

export default PersonalInfoForm
