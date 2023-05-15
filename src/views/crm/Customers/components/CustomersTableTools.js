import React, { useRef, useState } from 'react'
import { Button, Dialog } from 'components/ui'
import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CreateForm from './CreateForm'

const CustomersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

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

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter />
            </div>
            <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
                <Button variant="solid" onClick={() => openDialog()} active={true} size="sm" >
                    + დამატება
                </Button>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <div className='add-form-div'>
                        <CreateForm />
                    </div>

                </Dialog>
            </div>
        </div>
    )
}

export default CustomersTableTools
