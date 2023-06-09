import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Alert, RangeCalendar } from 'components/ui'
import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './UserTableSearch'
import CustomerTableFilter from './UserTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CreateForm from './CreateForm'
import { setCustomerList } from '../store/dataSlice'
import { fetchList } from 'services/Sales'
import dayjs from 'dayjs'
import { HiCalendar } from 'react-icons/hi'
import { range } from 'lodash'

const Range = () => {
    const [value, setValue] = useState([
        new Date(),
        dayjs(new Date()).add(5, 'days').toDate(),
    ])

    console.log('ret', value )

    return (
        <div className="absolute shadow-md bg-white border-black  top-[193px] left-[304px] md:w-[260px] max-w-[260px] mx-auto">
            <RangeCalendar value={value} onChange={setValue} />
        </div>
    )
}

const CustomersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const [message, setMessage] = useState('')

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

    const token = useSelector((state) => state.auth.session.token)
    const companyId = useSelector(state => state.auth.user.companyId)


    useEffect(() => {
        const fetchData = async () => {
            const data = { salesID: '' }
            const incomeData = await fetchList(token);
            if (incomeData) {
                dispatch(setCustomerList(incomeData))
                dispatch(setFilterData(incomeData))
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
    const [openRange, setOpenRange] = useState(false)
    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                {/* <CustomerTableFilter /> */}
                <HiCalendar onClick={() => setOpenRange(!openRange)} />
                {openRange && <Range />}
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
                    <div>
                        <CreateForm setMessage={setMessage} message={message} />
                    </div>
                    {message && (
                        <Alert className="mb-4 respons-notf" type={message === "success" ? "success" : "danger"} showIcon>
                            {message === "success" ? 'გაყიდვა წარმატებით დაემატა' : message}
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
