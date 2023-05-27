import React, { useState, forwardRef, useEffect } from 'react'
import { Tabs, Dialog, FormContainer, Button } from 'components/ui'
import { Form, Formik } from 'formik'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as Yup from 'yup'
import PersonalInfoForm from './PersonalInfoForm'
import { ValidationSchemaCustomer, ValidationSchemaUser, ValidationSchemaTrainer } from './ValidationSchema'
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
    }

    const [validationSchema, setValidationSchema] = useState()

    useEffect(() => {
        if (type === 'customer') {
            setValidationSchema(ValidationSchemaCustomer)
        } else if (type === 'trainer') {
            console.log('i am trener')
            setValidationSchema(ValidationSchemaTrainer)
        } else if (type === 'user') {
            setValidationSchema(ValidationSchemaUser)
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
                                    პრიადი ინფორმაცია
                                </TabNav>
                            </TabList>
                            <div className="p-6">
                                <TabContent value="personalInfo">
                                    <PersonalInfoForm
                                        touched={touched}
                                        errors={errors}
                                        type={type}
                                    />
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
