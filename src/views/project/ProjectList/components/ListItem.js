import React from 'react'
import { Card } from 'components/ui'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const ListItem = ({ item, cardBorder }) => {
    const [dialogIsOpen, setIsOpen] = React.useState(false)

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

    return (
        <div className="mb-4" onClick={onDialogOk}>
            <Card bordered={cardBorder}>
                <div className="grid gap-x-4 grid-cols-12">
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <div className="flex flex-col">
                            <h6 className="font-bold">
                                <Link to="/app/project/scrum-board">
                                    {item.customer?.firstname}{' '}
                                    {item?.customer?.lastname} - პ/ნ:{' '}
                                    {item?.customer?.idCard}
                                </Link>
                            </h6>
                            <span>
                                {item.customer?.mobile} <br />
                                {item?.aboniment?.name}
                                <br /> საშეღავათო პერიოდი:{' '}
                                {item?.aboniment?.countStartsDays}
                                <br /> შესვლის რაოდენობა:{' '}
                                {item?.aboniment?.maxEntries}
                            </span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-2 md:col-span-2 lg:col-span-2 md:flex md:items-center md:justify-end">
                        <div className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-full">
                            <HiOutlineClipboardCheck className="text-base" />
                            <span className="ml-1 rtl:mr-1 whitespace-nowrap"></span>
                        </div>
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-2 lg:col-span-3 md:flex md:items-center">
                        <ProgressionBar progression={100} />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-3 md:flex md:items-center">
                        <Members />
                    </div>
                    <div className="my-1 sm:my-0 col-span-12 sm:col-span-1 flex md:items-center justify-end">
                        <div className="mb-4 flex w-[80%] py-4">
                            <div className="w-1/2 font-bold">
                                სრული ღირებულება
                            </div>
                            <div className="text-green-500">
                                {item?.totalPrice}₾
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            
        </div>
    )
}

export default ListItem
