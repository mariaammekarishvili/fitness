import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Alert } from 'components/ui'
import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './UserTableSearch'
import CustomerTableFilter from './UserTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CreateForm from './CreateForm'
import { setCustomerList } from '../store/dataSlice'
import { fetchList } from 'services/UserService'

const CustomersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const [message, setMessage] = useState('')

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

    const token = useSelector((state) => state.auth.session.token)
    const companyId = useSelector(state => state.auth.user.companyId)

    useEffect(() => {// const type = 'customer' || 'user' || 'trainer'

        const fetchData = async () => {
            const data = await fetchList({ companyId }, token);
            if (data) {
                dispatch(setCustomerList(data))
            }
        };
        fetchData();
    }, [companyId, message]);

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getCustomers(data))
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                setMessage('');
                setIsOpen(false)
            }, 5000);
            // Clean up the timeout when the component unmounts or when the effect is re-triggered
            return () => clearTimeout(timeout);
        }
    }, [message])

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter />
            </div>
            <div className="mb-4 flex">
                {/* <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button> */}
                <div style={{ marginLeft: '10px' }}>
                    <Button variant="solid" onClick={() => openDialog()} active={true} size="sm" >
                        + დამატება
                    </Button>
                </div>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <div className='add-form-div'>
                        <CreateForm setMessage={setMessage} message={message} />
                    </div>
                    {message && (
                        <Alert className="mb-4 respons-notf" type={message === "success" ? "success" : "danger"} showIcon>
                            {message === "success" ? 'მომხმარებელი წარმატებით დაემატა' : message}
                        </Alert>
                    )}
                </Dialog>
                <div style={{ position: 'absolute' }}>
                </div>
            </div>
        </div>
    )
}

export default CustomersTableTools
