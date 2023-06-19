import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, Alert, RangeCalendar } from 'components/ui'
import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './UserTableSearch'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import CreateForm from './CreateForm'
import { setCustomerList as setSaleList } from '../store/dataSlice'
import { fetchList } from 'services/Sales'
import dayjs from 'dayjs'
import { HiOutlineCalendar } from 'react-icons/hi'
import { filterByDate } from 'services/Sales'
import { fetchTrainerList } from 'services/TrainerService'
import { fetchList as workoutFetch } from 'services/WorkoutService'
import { fetchList as abonimentFetch } from 'services/AbonimentService'
import { fetchList as usersFetch } from 'services/UserService'
import { fetchCustomers } from 'services/CrmService'
import UserTableFilter from './UserTableFilter'
import OutsideClickHandler from 'react-outside-click-handler'

const CustomersTableTools = () => {
    const dispatch = useDispatch()

    const inputRef = useRef()

    const [message, setMessage] = useState('')

    const tableData = useSelector((state) => state.crmCustomers.data.tableData)

    const token = useSelector((state) => state.auth.session.token)
    const companyId = useSelector((state) => state.auth.user.companyId)

    const [value, setValue] = useState([
        new Date(),
        dayjs(new Date()).add(5, 'days').toDate(),
    ])

    const [trainerList, setTrenerList] = useState([
        {
            value: '',
            label: 'გასუფთავება',
        },
    ])
    const [abonimentList, setAbonimentList] = useState([
        {
            value: '',
            label: 'გასუფთავება',
        },
    ])
    const [customerList, setCustomerList] = useState([
        {
            value: '',
            label: 'გასუფთავება',
        },
    ])
    const [workoutList, setWorkoutList] = useState([
        {
            value: '',
            label: 'გასუფთავება',
        },
    ])
    const [userList, setUserList] = useState([
        {
            value: '',
            label: 'გასუფთავება',
        },
    ])

    useEffect(() => {
        const fetchTrainer = async () => {
            const data = await fetchTrainerList({ companyId }, token)
            if (data) {
                const updatedList = data.map((item) => ({
                    value: item.trainerID,
                    label:
                        item.firstname +
                        ' ' +
                        item.lastname +
                        ' პ/ნ: ' +
                        item.idCard,
                }))
                setTrenerList([...trainerList, ...updatedList])
            }
        }
        const fetchUser = async () => {
            const data = await usersFetch({ companyId }, token)
            if (data) {
                const updatedList = data.map((item) => ({
                    value: item.userID,
                    label:
                        item.firstname +
                        ' ' +
                        item.lastname +
                        ' პ/ნ: ' +
                        item.idCard,
                }))
                setUserList([...userList, ...updatedList])
            }
        }

        const fetchAboniment = async () => {
            const data = await abonimentFetch({ companyId }, token)
            if (data) {
                const updatedList = data.map((item) => ({
                    value: item.abonimentID,
                    label: item.name,
                }))
                setAbonimentList([...abonimentList, ...updatedList])
            }
        }

        const fetchWorkout = async () => {
            const data = await workoutFetch({ companyId }, token)
            if (data) {
                const updatedWorkoutList = data.map((workout) => ({
                    value: workout.workoutID,
                    label: workout.name,
                }))

                setWorkoutList([...workoutList, ...updatedWorkoutList])
            }
        }

        const fetchCustomersList = async () => {
            const data = await fetchCustomers({ companyId }, token)
            const updatedList = data.map((item) => ({
                value: item.customerID,
                label:
                    item.firstname +
                    ' ' +
                    item.lastname +
                    ' პ/ნ: ' +
                    item.idCard,
            }))
            setCustomerList([...customerList, ...updatedList])
        }

        fetchAboniment()
        fetchWorkout()
        fetchCustomersList()
        fetchTrainer()
        fetchUser()
    }, [])

    const filterWithDate = async () => {
        const data = await filterByDate(
            { startDate: value[0], endDate: value[1] },
            token
        )
        if (data) {
            dispatch(setFilterData(data))
        }
        setOpenRange(false)
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = { salesID: '' }
    //         const incomeData = await fetchList(token)
    //         if (incomeData) {
    //             dispatch(setSaleList(incomeData))
    //             dispatch(setFilterData(incomeData))
    //         }
    //     }
    //     fetchData()
    // }, [companyId, message])

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
                setMessage('')
                setIsOpen(false)
            }, 1000)
            // Clean up the timeout when the component unmounts or when the effect is re-triggered
            return () => clearTimeout(timeout)
        }
    }, [message])

    const [openRange, setOpenRange] = useState(false)

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center w-[100%] justify-between space-y-4 gap-4">
                <UserTableFilter
                    trainerList={trainerList}
                    abonimentList={abonimentList}
                    customerList={customerList}
                    workoutList={workoutList}
                    token={token}
                    userList={userList}
                />
               
            </div>
            <div className="mb-4 flex">
                <div style={{ marginLeft: '10px' }}>
                    <Button
                        variant="solid"
                        onClick={() => openDialog()}
                        active={true}
                        size="sm"
                    >
                        + დამატება
                    </Button>
                </div>
                <Dialog
                    isOpen={dialogIsOpen}
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                >
                    <div>
                        <CreateForm
                            trainerList={trainerList}
                            abonimentList={abonimentList}
                            customerList={customerList}
                            setMessage={setMessage}
                            message={message}
                            workoutList={workoutList}
                        />
                    </div>
                    {message && (
                        <Alert
                            className="mb-4 respons-notf"
                            type={message === 'success' ? 'success' : 'danger'}
                            showIcon
                        >
                            {message === 'success'
                                ? 'გაყიდვა წარმატებით დაემატა'
                                : message}
                        </Alert>
                    )}
                </Dialog>
                <div style={{ position: 'absolute' }}></div>
            </div>
        </div>
    )
}

export default CustomersTableTools
