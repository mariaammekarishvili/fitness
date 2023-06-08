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
import CustomerEditDialog from './TrainerEditDialog'
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

const NameColumn = ({ row }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle" src={'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'} />
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            >
                {row.firstname} {row.lastname}
            </Link>
        </div>
    )
}

const dateColumn = ({ row }) => {
    const months = {
        january: 'იანვარი',
        february: 'თებერვალი',
        march: 'მარტი',
        april: 'აპრილი',
        may: 'მაისი',
        june: 'ივნისი',
        july: 'ივლისი',
        august: 'აგვისტო',
        september: 'სექტემბერი',
        october: 'ოქტომბერი',
        november: 'ნოემბერი',
        december: 'დეკემბერი'
    }

    return (
        <div className="flex items-center">
            {formatDate(row.birthday)}
        </div>
    )
}

const formatPhoneNumber = (phoneNumber) => {
    const cleaned = String(phoneNumber)?.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
        return `(${match[1]}) ${match[2]} - ${match[3]}`;
    }
    return phoneNumber;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formattedDate;
};



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
        header: 'პირადი  ნომერი',
        accessorKey: 'idCard',
    },
    {
        header: 'მობილური',
        accessorKey: 'mobile',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {formatPhoneNumber(row.mobile)}
                </div>
            )
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
        header: 'დაბადების თარიღი',
        accessorKey: 'birthday',
        cell: (props) => {
            const row = props.row.original
            const birthday = row.birthday;
            const date = new Date(birthday);

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const formattedBirthday = `${day}/${month}/${year}`;
            return (
                <div>
                    <p>{formattedBirthday}</p>
                </div>
            )
        }
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
