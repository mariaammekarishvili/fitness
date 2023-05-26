import React, { forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList, putCustomer } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import CustomerForm from 'views/crm/CustomerForm'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmCustomers.data.customerList)
  
    const id = customer.trainerID

    const onFormSubmit = (values) => {
        const {
            firstname,
            lastname,
            idCard,
            email,
            mobile,
            address,
            birthday,
            gander,
        } = values

        const basicInfo = {
            firstname,
            lastname,
            idCard,
            email,
            mobile,
            address,
            birthday,
            gander,
        }
        const personalInfo = {}
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.customerID === id) {
                elm = { ...elm, ...basicInfo }
                elm.personalInfo = { ...elm.personalInfo, ...personalInfo }
                editedCustomer = elm
            }
            return elm
        })
        // if (!isEmpty(editedCustomer)) {
            console.log('editedCustomer', editedCustomer)
            dispatch(putCustomer({ data: editedCustomer, customerID: id }))
        // }/
        dispatch(setDrawerClose())
        dispatch(setCustomerList(newData))
    }
  
    return (
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
            type={'trainer'}
        />
    )
})

export default CustomerEditContent
