import React, { useState } from 'react'
import { Card, Button, Notification, toast, Dialog } from 'components/ui'

import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomer } from '../store/dataSlice'
import { openEditCustomerDetailDialog } from '../store/stateSlice'
import EditCustomerProfile from './EditCustomerProfile'
import {
    deleteUserTurniketCard,
    putUserNewTurniketCode,
} from 'services/CrmService'
import useQuery from 'utils/hooks/useQuery'

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
        // dispatch(deleteCustomer({ id }))
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

const CustomerProfile = ({ item = {}, isCustomer }) => {
    const query = useQuery()

    const [isOpen, setIsOpen] = useState(false)
    const [changeIsOpen, setChangeIsOpen] = useState(false)
    const openDialog = () => {
        setIsOpen(true)
    }
    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
        setChangeIsOpen(false)
    }

    const id = query.get('id')
    const token = useSelector((state) => state.auth.session.token)

    const deleteAction = async () => {
        try {
            await deleteUserTurniketCard(id, token)
            // Handle success, e.g., show a success message or update state
        } catch (error) {
            // Handle error, e.g., show an error message or log the error
        }
    }

    const updateTurniketCode = async () => {
        const data = {
            turniketCode: newTurniketCode,
        }
        try {
            await putUserNewTurniketCode(id, token, data)
            // Handle success, e.g., show a success message or update state
        } catch (error) {
            // Handle error, e.g., show an error message or log the error
        }
    }
    const [newTurniketCode, setNewTurniketCode] = useState('')

    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <div className="flex items-center justify-center">
                        <div className="w-[90px] flex justify-center items-center h-[90px] bg-blue-500 rounded-full ">
                            <h3 className="text-[#FFFF]">
                                {item?.customer?.firstname[0].toUpperCase() ||
                                    item?.firstname[0].toUpperCase()}
                                
                                {item?.customer?.lastname[0].toUpperCase() ||
                                    item?.lastname[0].toUpperCase()}
                            </h3>
                        </div>
                    </div>
                    {/* <Members members={[{ name: name?.toUpperCase() }]} /> */}

                    <h4 className="font-bold">
                        {item.customer?.firstname || item.firstname}{' '}
                        {item?.customer?.lastname || item?.lastname}
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

                    {isCustomer && (
                        <>
                            <CustomerInfoField
                                title="მეილი"
                                value={item?.email}
                            />
                            <CustomerInfoField
                                title="მობილური"
                                value={item?.mobile}
                            />
                            <CustomerInfoField
                                title="პირადი ნომერი"
                                value={item?.idCard}
                            />
                            <CustomerInfoField
                                title="სტატუსი"
                                value={item?.status}
                            />
                        </>
                    )}
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
                    {!isCustomer && (
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
                    )}
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
                    <Dialog
                        isOpen={isOpen}
                        onClose={onDialogClose}
                        onRequestClose={onDialogClose}
                    >
                        <div className="flex-col flex items-center center column pt-[15px]">
                            <h5 className="mb-4">ნამდვილად გსურთ წაშლა?</h5>
                            <div className="text-right mt-6">
                                <Button
                                    className="ltr:mr-2 border rtl:ml-2"
                                    variant="plain"
                                    onClick={onDialogClose}
                                >
                                    არა
                                </Button>
                                <Button
                                    color="red-600"
                                    variant="solid"
                                    onClick={deleteAction}
                                >
                                    დიახ
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog
                        isOpen={changeIsOpen}
                        onClose={onDialogClose}
                        onRequestClose={onDialogClose}
                    >
                        <div className="flex-col flex items-center center column pt-[15px]">
                            <h5 className="mb-4">შეიყვანეთ ახალი ბარათის ID</h5>
                            {/* <input type='text'
                            className="border rounded py-2 px-3 focus:outline-none focus:ring w-[90%] focus:border-blue-600"
                            placeholder="..."
                             value={newTurniketCode} onChange={(e) => setNewTurniketCode(e.target.value)}></input> */}
                            <div className="text-right mt-6">
                                <Button
                                    className="ltr:mr-2 border rtl:ml-2 green-600"
                                    variant="solid"
                                    onClick={updateTurniketCode}
                                >
                                    შენახვა
                                </Button>
                                <Button
                                    color="red-600"
                                    // variant="solid"
                                    onClick={onDialogClose}
                                >
                                    გაუქმება
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                    {isCustomer && (
                        <>
                            <Button
                                className="mr-2 mb-1"
                                variant="solid"
                                color="yellow-600"
                                onClick={() => setChangeIsOpen(true)}
                            >
                                ბარათის შეცვლა
                            </Button>
                            <Button
                                className="mr-2 mb-2"
                                variant="solid"
                                color="red-600"
                                onClick={openDialog}
                            >
                                ბარათის წაშლა
                            </Button>
                        </>
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
