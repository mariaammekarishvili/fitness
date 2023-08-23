import React, { useState } from 'react'
import { Card, Button, Notification, toast, Dialog } from 'components/ui'

import { HiPencilAlt, HiOutlineTrash, HiUser } from 'react-icons/hi'
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
import SubmitPopup from './SubmitPopup'
import { updatePauseCustomer } from 'services/UserService'
import { TurniketCodePopup } from './TurniketCodePopup'
import { CostumerPausePopup } from './CostumerPausePopup'

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
    const [pause, setPause] = useState(false)
    
    const id = query.get('id')
    const token = useSelector((state) => state.auth.session.token)
    const [feedback, setFeedback] = useState('')

    const deleteAction = async () => {
        try {
            await deleteUserTurniketCard(id, token)
            setFeedback('success')
            setTimeout(() => {
                setIsOpen(false)
                setFeedback('')
            }, 3000)
            // Handle success, e.g., show a success message or update state
        } catch (error) {
            setFeedback('danger')
            setTimeout(() => {
                setIsOpen(false)
                setFeedback('')
            }, 3000)
            // Handle error, e.g., show an error message or log the error
        }
    }

    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <div className="flex items-center justify-center">
                        <div className="w-[90px] flex justify-center items-center h-[90px] bg-blue-500 rounded-full ">
                            <h3 className="text-[#FFFF]">
                                {isCustomer && <HiUser />}
                                {!isCustomer &&
                                    item?.customer?.firstname[0]?.toUpperCase() +
                                        '.' +
                                        item?.customer?.lastname[0]?.toUpperCase()}
                            </h3>
                        </div>
                    </div>
                    {/* <Members members={[{ name: name?.toUpperCase() }]} /> */}

                    <h4 className="font-bold">
                        {item?.customer?.firstname || item?.firstname}{' '}
                        {item?.customer?.lastname || item?.lastname}
                    </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[96%] xl:grid-cols-1 gap-y-6 gap-x-4 mt-8">
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
                    <SubmitPopup
                        feedback={feedback}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        SubmitFunction={deleteAction}
                        text={'ნამდვილად გსურთ ბარათის წაშლა?'}
                    />

                    <CostumerPausePopup 
                        changeIsOpen={pause}
                        setChangeIsOpen={setPause}
                        token={token}
                        id={id}
                    />

                    <TurniketCodePopup
                        changeIsOpen={changeIsOpen}
                        token={token}
                        id={id}
                        setChangeIsOpen={setChangeIsOpen}
                    />

                    {isCustomer && (
                        <>
                            <div className="flex justify-between max-w-[97%]">
                                <Button
                                    className="px-[0px] py-0 mb-[-15px] w-[161px]"
                                    // variant="solid"
                                    size="md"
                                    color="yellow-600"
                                    onClick={() => setChangeIsOpen(true)}
                                >
                                    ბარათის შეცვლა
                                </Button>
                                <Button
                                    className="px-[0px] py-0 w-[161px]"
                                    variant="solid"
                                    color="red-600"
                                    size="md"
                                    onClick={() => setIsOpen(true)}
                                >
                                    ბარათის წაშლა
                                </Button>
                            </div>
                            <Button
                                className="mb-2 mt-[-15px] max-w-[97%]"
                                variant="solid"
                                color="gray-500"
                                onClick={() => setPause(true)}
                            >
                                დაპაუზება
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
