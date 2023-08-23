import { IconText } from 'components/shared'
import { Alert, Button, Card, Tag } from 'components/ui'
import dayjs from 'dayjs'
import { HiCalendar, HiCash } from 'react-icons/hi'
import SubmitPopup from './SubmitPopup'
import { useState } from 'react'
import { updateFixVisit } from 'services/Sales'

const AbonimentsCard = ({ item, token }) => {
    const [visitPopup, setVisitPopup] = useState(false)
    const [feedback, setFeedback] = useState('')

    const salesID = item?.salesID

    const handleUpdateClick = async () => {
        try {
            const updatedFixVisit = await updateFixVisit(token, salesID)
            console.log('Fix visit updated:', updatedFixVisit)
            setFeedback('success')
            setTimeout(() => {
                setVisitPopup(false)
                setFeedback('')
            }, 3000)
        } catch (error) {
            console.error('Error updating fix visit:', error)
            setFeedback('danger')
            setTimeout(() => {
                setVisitPopup(false)
                setFeedback('')
            }, 3000)
        }
    }

    return (
        <>
            <SubmitPopup
                text={'ნამდვილად გსურთ ვიზიტის ხელით გატარება?'}
                isOpen={visitPopup}
                setIsOpen={setVisitPopup}
                SubmitFunction={handleUpdateClick}
                feedback={feedback}
            />
            <Card
                className={
                     item?.aboniment?.isActive
                        ? 'bg-[#ECFDF5] my-card'
                        : 'bg-[#FFF7ED] my-card'
                }
                //   ref={ref}
                // className={
                //     'hover:shadow-lg rounded-lg dark:bg-gray-700 bg-gray-50 opacity-0 overflow-hidden h-0'
                // }
                // bodyClass="p-4"
                // clickable
            >
                <div>
                    <Tag
                        className="mr-2 rtl:ml-2 mb-2"
                        prefixClass={
                            item?.aboniment?.isActive
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }
                        prefix
                    >
                        {item?.aboniment?.isActive ? 'აქტიური' : 'არა აქტიური'}
                    </Tag>
                    <h6 className="mb-2">{item?.aboniment?.name}</h6>
                    <IconText
                        textClass="text-sm font-semibold"
                        className="mb-2"
                        icon={<HiCalendar className="text-lg" />}
                    >
                        {dayjs(item?.aboniment?.createdAt).format(
                            'MMMM DD YYYY'
                        )}
                    </IconText>
                    <div>
                        <span className="text-bold">ტრენერი:</span>{' '}
                        {item?.trainer?.firstname} {item?.trainer?.lastname}
                    </div>
                    <div className="flex">
                        <div className="mr-[5px]">სავარჯიო ჯგუფი: </div>
                        <div>
                            {'  '}
                            {item?.workouts?.map((workout, index) => (
                                <div key={index}>{workout}</div>
                            ))}{' '}
                        </div>
                    </div>
                    <div />
                </div>
                <div>
                    <div className="flex items-center justify-end">
                        <div className="flex items-center gap-2">
                            <IconText
                                className="font-semibold"
                                icon={<HiCash className="text-base" />}
                            >
                                {item.totalPrice} ₾
                            </IconText>
                        </div>
                    </div>
                    <div className="mt-[20px] flex justify-between">
                        {item?.aboniment?.isActive && (
                            <Button
                                color="green-600"
                                variant="solid"
                                onClick={() => setVisitPopup(true)}
                                size="sm"
                                className="w-[49%]"
                            >
                                ვიზიტის გატარება
                            </Button>
                        )}
                        <Button
                            variant="twoTone"
                            color="yellow-600"
                            onClick={null}
                            size="sm"
                            className="w-[49%]"
                        >
                            თარიღის შეცვლა
                        </Button>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default AbonimentsCard
