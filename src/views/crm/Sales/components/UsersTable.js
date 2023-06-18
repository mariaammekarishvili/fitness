import React, { useMemo } from 'react'
import { Avatar, Button } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData } from '../store/dataSlice'
import { setSelectedCustomer, setDrawerOpen } from '../store/stateSlice'
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
        <Button
            className={`mb-[7px]`}
            size={'sm'}
            onClick={onEdit}
            icon={<HiOutlinePencil />}
        >
            <span>რედაქტირება</span>
        </Button>
    )
}

const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar
                size={28}
                shape="circle"
                src={
                    'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'
                }
            />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row?.id}`}
            >
                {row?.name}
            </Link>
        </div>
    )
}

const columns = [
    {
        header: 'სრული ღირებულება',
        accessorKey: 'totalPrice',
        cell: (props) => {
            const row = props.row.original
            return (
                <div style={{ color: 'green' }} className="flex items-center">
                    {row.totalPrice}ლ
                </div>
            )
        },
    },
    {
        header: 'მომხმარებელი',
        accessorKey: 'customer',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row?.customer?.firstname} {row?.customer?.lastname} - პ/ნ:{' '}
                    {row?.customer?.idCard}
                </div>
            )
        },
    },
    {
        header: 'ტრენერი',
        accessorKey: 'trainer',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row?.trainer?.firstname} {row?.trainer?.lastname} - პ/ნ:{' '}
                    {row?.trainer?.idCard}
                </div>
            )
        },
    },
    {
        header: 'დაწყება - დასრულება',
        accessorKey: 'id',
        cell: (props) => {
            const row = props.row.original
            const dateComponent = (incomeDate) => {
                if (incomeDate != null) {
                    const formattedDate = new Date(
                        incomeDate
                    ).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                    })
                    return formattedDate
                }
            }
            return (
                <div className="flex items-center">
                    {dateComponent(row?.startDate)} -{' '}
                    {dateComponent(row?.endDate)}
                </div>
            )
        },
    },
    {
        header: 'სავარჯიშო ჯგუფები',
        accessorKey: 'workouts',
        cell: (props) => {
            const row = props.row.original
            if (!row?.workouts) return
            return (
                <>
                    {row?.workouts.map((workout, index) => (
                        <div key={index}>{workout}</div>
                    ))}
                </>
            )
        },
    },
    {
        header: 'თვეების რაოდენობა',
        accessorKey: 'abonimentCount',
    },
    { header: 'გამოყენებული ვიზიტები', accessorKey: 'visitCount' },
    {
        header: 'ასმინისტრატორი (გამყიდველი)',
        accessorKey: 'user',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {row?.user?.firstname} {row?.user?.lastname} - პ/ნ:{' '}
                    {row?.user?.idCard}
                </div>
            )
        },
    },

    {
        header: '',
        id: 'deleteAction',
        cell: (props) => <DeleteColumn row={props.row?.original} />,
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
