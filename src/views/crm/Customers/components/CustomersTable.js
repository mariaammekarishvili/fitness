import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Avatar, Badge } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomer, getCustomers, setTableData } from '../store/dataSlice'
import {
    setSelectedCustomer,
    setDrawerOpen,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { Button, Dialog } from 'components/ui'
import { setCustomerList } from '../store/dataSlice'
import { fetchCustomers } from 'services/CrmService'


const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            Edit
        </div>
    )
}

const DeleteColumn = ({ row }) => {
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

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
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
                <div className='flex-col flex items-center center column pt-[50px]'>
                    <h5 className="mb-4">გსურთ იუზერის წაშლა?</h5>
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
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Email',
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
        header: 'დაბადების თარიღი',
        accessorKey: 'birthday',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {formatDate(row.birthday)}
                </div>
            )
        },
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
                data={data}
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
