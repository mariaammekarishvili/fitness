import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import CustomerForm from 'views/crm/CustomerForm'
import { setFilterData } from 'views/crm/Customers/store/dataSlice'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const id = customer.workoutID

    const onFormSubmit = (values) => {
        const {
            name,
            price,
            maxEntries,
            countStartsDays
        } = values

        const basicInfo = {
            name,
            price,
            maxEntries,
            countStartsDays
        }
        const personalInfo = {}
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.workoutID === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        // if (!isEmpty(editedCustomer)) {
        console.log('edited', editedCustomer)
        dispatch(putCustomer({ data: editedCustomer, customerID: id }))
        // }/
        dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
        dispatch(setFilterData(newData))
    }

    return (
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
            type={'workout'}
        />
    )
})

export default CustomerEditContent
