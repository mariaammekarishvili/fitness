import React, { useState } from 'react'
import { Card, Avatar, Button, Notification, toast } from 'components/ui'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from '../store/dataSlice'
import { openEditCustomerDetailDialog } from '../store/stateSlice'
import EditCustomerProfile from './EditCustomerProfile'

const CustomerInfoField = ({ title, value }) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}

const CustomerProfileAction = ({ id }) => {
    const dispatch = useDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setDialogOpen(true)
    }

    const onDelete = () => {
        setDialogOpen(false)
        dispatch(deleteCustomer({ id }))
        navigate('/app/crm/customers')
        toast.push(
            <Notification title={'Successfuly Deleted'} type="success">
                Customer successfuly deleted
            </Notification>
        )
    }

    const onEdit = () => {
        dispatch(openEditCustomerDetailDialog())
    }

    return (
        <>
            <Button block icon={<HiOutlineTrash />} onClick={onDialogOpen}>
                Delete
            </Button>
            <Button
                icon={<HiPencilAlt />}
                block
                variant="solid"
                onClick={onEdit}
            >
                Edit
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                type="danger"
                title="Delete customer"
                onCancel={onDialogClose}
                onConfirm={onDelete}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this customer? All record
                    related to this customer will be deleted as well. This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
            <EditCustomerProfile />
        </>
    )
}
const DateComponent = ({ incomeDate }) => {
    const formattedDate = new Date(incomeDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    })

    return <>{formattedDate}</>
}

const CustomerProfile = ({ item = {} }) => {
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <div class="flex items-center justify-center">
                        <div class="w-[90px] flex justify-center items-center h-[90px] bg-blue-500 rounded-full ">
                           <h3 className='text-[#FFFF]'> {item.customer?.firstname[0].toUpperCase()}.{item.customer?.lastname[0].toUpperCase()}</h3>
                        </div>
                    </div>
                    {/* <Members members={[{ name: name.toUpperCase() }]} /> */}

                    <h4 className="font-bold">
                        {item.customer?.firstname} {item?.customer?.lastname}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <CustomerInfoField
                        title="ბარათის ID"
                        value={item?.turniketCode}
                    />
                    <CustomerInfoField
                        title="თარიღი"
                        value={<DateComponent incomeDate={item?.createdAt} />}
                    />
                    {item?.trainer && (
                        <>
                            <CustomerInfoField
                                title="ტრენერი"
                                value={
                                    item?.trainer?.firstname +
                                    ' ' +
                                    item?.trainer?.lastname +
                                    ' პ/ნ: ' +
                                    item?.trainer?.idCard
                                }
                            />
                            <CustomerInfoField
                                title="ტრენერის ღირებულება"
                                value={item?.trainerPrice}
                            />
                        </>
                    )}
                    <CustomerInfoField
                        title="აბონიმენტი"
                        value={
                            <div>
                                {item?.aboniment?.name}
                                <br /> საშეღავათო პერიოდი:{' '}
                                {item?.aboniment?.countStartsDays}
                                <br /> შესვლის რაოდენობა:{' '}
                                {item?.aboniment?.maxEntries}
                            </div>
                        }
                    />
                    {item?.workouts && (
                        <CustomerInfoField
                            title="საარჯიშო ჯგუფები"
                            value={
                                <>
                                    {item?.workouts.map((workout, index) => (
                                        <div key={index}>{workout}</div>
                                    ))}
                                    <div>
                                        {' '}
                                        საარჯიშო ჯგუფების სრული ღირებულება:{' '}
                                        {item?.workoutPrice}₾
                                    </div>
                                </>
                            }
                        />
                    )}
                    {/* <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4">
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#1773ea]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={<FaTwitter className="text-[#1da1f3]" />}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaLinkedinIn className="text-[#0077b5]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaPinterestP className="text-[#df0018]" />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <CustomerProfileAction id={data.id} />
                </div> */}
                </div>
            </div>
        </Card>
    )
}

export default CustomerProfile
