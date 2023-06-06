import React, { useState } from 'react'
import { deleteCustomer } from '../store/dataSlice'
import { Button, Dialog } from 'components/ui'
import { setCustomerList } from '../store/dataSlice'
import { fetchCustomers } from 'services/CrmService'
import { useDispatch, useSelector } from 'react-redux'

export const DeleteColumn = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useDispatch()

    const openDialog = () => {
        setIsOpen(true)
    }

    const token = useSelector((state) => state.auth.session.token)

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const deleteAction = async () => {
        dispatch(deleteCustomer({ data: row, customerID: row.customerID }))
        setIsOpen(false);

        setTimeout(async () => {
            const data = await fetchCustomers({ companyId: row?.companyID }, token);
            if (data) {
                dispatch(setCustomerList(data));
            }
        }, 1000);
    };

    return (
        <>
            <Button
                className="mr-2 mb-2" size={'sm'} variant="solid" color="red-600"
                onClick={openDialog}
            >
                წაშლა
            </Button>

            <Dialog
                isOpen={isOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className='flex-col flex items-center center column pt-[15px]'>
                    <h5 className="mb-4">ნამდვილად გსურთ წაშლა?</h5>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 border rtl:ml-2"
                            variant="plain"
                            onClick={onDialogClose}
                        >
                            არა
                        </Button>
                        <Button color="red-600" variant="solid" onClick={deleteAction}>
                            დიახ
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}