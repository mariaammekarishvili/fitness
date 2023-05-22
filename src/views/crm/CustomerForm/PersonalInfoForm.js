import React from 'react'
import { Input, FormItem, Avatar, Radio, Upload } from 'components/ui'
import {
    HiUserCircle,
    HiMail,
    HiLocationMarker,
    HiPhone,
    HiCalendar,
    HiIdentification,
    HiCash
} from 'react-icons/hi'
import { Field } from 'formik'

const PersonalInfoForm = (props) => {
    const { touched, errors, type } = props

    return (
        <>
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
                    prefix={<HiUserCircle className="text-xl" />}
                />
            </FormItem>
            <FormItem
                label="გვარი"
                invalid={errors.lastname && touched.lastname}
                errorMessage={errors.lastname}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="lastname"
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
                    prefix={<HiIdentification className="text-xl" />}

                />
            </FormItem>
            {!(type === 'trainer') &&
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
            }
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
                    prefix={<HiPhone className="text-xl" />}

                />
            </FormItem>
            {type === 'trainer' && (
                <FormItem
                    label="ფასი"
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
            )}
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
                    prefix={<HiLocationMarker className="text-xl" />}

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
        </>
    )
}

export default PersonalInfoForm
