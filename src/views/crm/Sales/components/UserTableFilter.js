import React from 'react'
import { setFilterData } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { components } from 'react-select'
import { HiCheck } from 'react-icons/hi'
import {
    RangeCalendar,
    Button,
    FormItem,
    FormContainer,
    Select,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { filterSaleList } from 'services/Sales'
import dayjs from 'dayjs'
import { HiOutlineCalendar } from 'react-icons/hi'
import OutsideClickHandler from 'react-outside-click-handler'
import { setCustomerList } from 'views/crm/Customers/store/dataSlice'

const CustomerTableFilter = ({
    trainerList,
    abonimentList,
    customerList,
    token,
    userList,
}) => {
    const dispatch = useDispatch()

    const filterSalesAction = async (data) => {
        try {
            data.startDate = value[0]
            data.endDate = value[1]
            const incomeData = await filterSaleList({ data }, token)
            if (incomeData) {
                dispatch(setCustomerList(incomeData))
            }
        } catch (error) {
            console.log(error?.message)
        }
    }
    const [openRange, setOpenRange] = React.useState(false)

    const [value, setValue] = React.useState([
        dayjs(new Date()).subtract(5, 'days').toDate(),
        new Date(),
    ])

    return (
        <div className="search-bar">
            <Formik
                initialValues={{
                    abonimentID: '',
                    customerID: '',
                    trainerID: '',
                    workoutID: '',
                    userID: '',
                }}
                onSubmit={(value) => filterSalesAction(value)}
            >
                {({ touched, errors, values, resetForm }) => (
                    <Form>
                        <FormContainer className="flex items-end justify-between">
                            <FormItem
                                className="mr-[14px]"
                                label="აირჩიეთ მომხმარებელი"
                                invalid={
                                    errors.customerID && touched.customerID
                                }
                                errorMessage={errors.customerID}
                            >
                                <Field name="customerID">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={customerList}
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
                                className="mr-[14px]"
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
                                className="mr-[14px]"
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
                                className="mr-[14px]"
                                label="აირჩიეთ თანამშრომელი"
                            >
                                <Field name="userID">
                                    {({ field, form }) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            options={userList}
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
                            <FormItem>
                                <HiOutlineCalendar
                                    className="cursor-pointer w-[53px] pointer h-[34px] mb-[7px] !important  calendar-icon-filter"
                                    onClick={() => setOpenRange(!openRange)}
                                />
                                {openRange && (
                                    <OutsideClickHandler
                                        onOutsideClick={() => {
                                            setOpenRange(false)
                                        }}
                                    >
                                        <div className="p-[14px] absolute shadow-md bg-white border-black important top-[23px] right-[4px] calendar-icon-filter md:w-[290px] max-w-[290px] mx-auto dark:bg-gray-900">
                                            <RangeCalendar
                                                locale="ge"
                                                value={value}
                                                onChange={setValue}
                                            />
                                        </div>
                                    </OutsideClickHandler>
                                )}
                            </FormItem>

                            <FormItem className="mr-[14px]">
                                <Button variant={'solid'} type="submit">
                                    ძებნა
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CustomerTableFilter
