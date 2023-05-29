import React, { useState, forwardRef, useEffect } from 'react'
import { Tabs, FormContainer } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import PersonalInfoForm from './PersonalInfoForm'
import AbonimentInfoForm from './AbonimentInfoForm'
import WorkoutInfoForm from './WorkoutInfoForm'
import { ValidationSchemaCustomer, ValidationSchemaWorkout, ValidationSchemaAboniment, ValidationSchemaUser, ValidationSchemaTrainer } from './ValidationSchema'
dayjs.extend(customParseFormat)

const { TabNav, TabList, TabContent } = Tabs

const CustomerForm = forwardRef((props, ref) => {
    const { customer, onFormSubmit, type } = props

    const valuesForForm = {
        firstname: customer.firstname || '',
        lastname: customer.lastname || '',
        idCard: customer.idCard || '',
        mobile: customer.mobile || '',
        address: customer.address || '',
        birthday: customer.birthday || '',
        gander: customer.gander || 'male',
        price: customer.price || 0,
        email: customer.email || '',
        password: '',
        role: customer.role || '',
        status: customer.status || '',
        name: customer.name || '',
        maxEntries: customer.maxEntries || 0,
        countStartsDays: customer.countStartsDays || 0,
        weekDays: customer.weekDays || '',
        timeOfTheDay: customer.timeOfTheDay || '',
        capacity: customer.capacity || ''
    }

    const [validationSchema, setValidationSchema] = useState()

    useEffect(() => {
        if (type === 'customer') {
            setValidationSchema(ValidationSchemaCustomer)
        } else if (type === 'trainer') {
            setValidationSchema(ValidationSchemaTrainer)
        } else if (type === 'user') {
            setValidationSchema(ValidationSchemaUser)
        } else if (type === 'aboniment') {
            setValidationSchema(ValidationSchemaAboniment)
        } else if (type === 'workout') {
            setValidationSchema(ValidationSchemaWorkout)
        }
    }, [])


    return (
        <Formik
            innerRef={ref}
            initialValues={valuesForForm}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit?.(values)
                setSubmitting(false)
            }}
        >
            {({ touched, errors, resetForm }) => (
                <Form>

                    <FormContainer>
                        <Tabs defaultValue="personalInfo">
                            <TabList>
                                <TabNav value="personalInfo">
                                    პირადი ინფორმაცია
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    {(!(type === 'aboniment') && !(type === 'workout')) &&
                                        <PersonalInfoForm
                                            touched={touched}
                                            errors={errors}
                                            type={type}
                                        />}
                                    {type === 'aboniment' &&
                                        <AbonimentInfoForm touched={touched}
                                            errors={errors}
                                            type={type}
                                        />}
                                    {type === 'workout' && 
                                    <WorkoutInfoForm
                                        errors={errors}
                                        type={type} />}
                                </TabContent>
                                {/* <TabContent value="social">
                                    <SocialLinkForm
                                        touched={touched}
                                        errors={errors}
                                    />
                                </TabContent> */}
                            </div>
                        </Tabs>
                    </FormContainer>

                </Form>
            )}
        </Formik>
    )
})

export default CustomerForm
