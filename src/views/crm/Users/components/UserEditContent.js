import React, { forwardRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerList,setFilterData, putCustomer } from '../store/dataSlice'
import { setDrawerClose } from '../store/stateSlice'
import cloneDeep from 'lodash/cloneDeep'
import CustomerForm from 'views/crm/CustomerForm'
import { Button } from 'react-scroll'
import { Input } from 'components/ui'

const CustomerEditContent = forwardRef((_, ref) => {
    const dispatch = useDispatch()

    const customer = useSelector(
        (state) => state.crmCustomers.state.selectedCustomer
    )
    const data = useSelector((state) => state.crmCustomers.data.customerList)
    const id = customer.userID

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
            role,
            password,
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
            role,
            password,
        }
        const personalInfo = {}
        let newData = cloneDeep(data)
        let editedCustomer = {}
        newData = newData.map((elm) => {
            if (elm.userID === id) {
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
        dispatch(setFilterData(newData))
    }
  const [changeCard, setChangeCard] = useState(false)
    return (
        <>
        <Button onClick={() => setChangeCard(true)}>ბარათის შეცვა</Button>
        {changeCard && 
        <Input type='text'/>
        }
        <CustomerForm
            ref={ref}
            onFormSubmit={onFormSubmit}
            customer={customer}
            type={'user'}
        /></>
    )
})

export default CustomerEditContent
