import React, { useMemo } from 'react'
import { Avatar, Button } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './UserEditDialog'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { DeleteColumn } from './DeleteColumn'

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <Button className={`mb-[7px]`} size={'sm'} onClick={onEdit} icon={<HiOutlinePencil />}>
            <span>რედაქტირება</span>
        </Button>
    )
}
const WeekDays = ({ row }) => {
    const daysOfWeek = {
        sunday: 'კვირა',
        monday: 'ორშაბათი',
        tuesday: 'სამშაბათი',
        wednesday: 'ოთხშაბათი',
        thursday: 'ხუთშაბათი',
        friday: 'პარასკევი',
        saturday: 'შაბათი',
    };

    return (
        <>
            {row.weekDays &&
                <>
                    {row.weekDays.map((item, key) => (
                        <div key={key}>{daysOfWeek[item]}</div>
                    ))}
                </>}
        </>
    )
}
const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'} />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const columns = [
    {
        header: 'სახელი',
        accessorKey: 'firstName',
        cell: (props) => {
            const row = props.row.original
            return <NameColumn row={row} />
        },
    },
    {
        header: 'ფასი',
        accessorKey: 'price',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row.price}₾
                </div>
            )
        },
    },
    {
        header: 'წევრების მაქსიმალური რაოდენობა',
        accessorKey: 'capacity',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row.capacity}
                </div>
            )
        },
    },
    {
        header: 'დაწყების დრო',
        accessorKey: 'timeOfTheDay',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row.timeOfTheDay} სთ
                </div>
            )
        },
    },
    {
        header: 'სავარჯიშო დღეები',
        accessorKey: 'weekDays',
        cell: (props) => <WeekDays row={props.row.original} />
    },
    {
        header: '',
        id: 'deleteAction',
        cell: (props) => <DeleteColumn row={props.row.original} />,
    },
    {
        header: '',
        id: 'action',
        cell: (props) => <ActionColumn row={props.row.original} />,
    },
]

const Customers = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.crmCustomers.data.customerList)

    const filterData = useSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={filterData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={!data}
                pagingData={{ pageIndex, pageSize, sort, query, total }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
        </>
    )
}

export default Customers
