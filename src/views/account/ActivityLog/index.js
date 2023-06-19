import React, { useEffect, useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserSale } from 'services/Sales'
import GridItem from 'views/project/ProjectList/components/GridItem'
import { StatisticCard } from 'views/crm/Sales/components/UserStatistic'
import { HiCash, HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlineCalendar } from 'react-icons/hi'
import OutsideClickHandler from 'react-outside-click-handler'
import dayjs from 'dayjs'
import { Button, RangeCalendar } from 'components/ui'
import { filterByDate } from 'services/Sales'
injectReducer('accountActivityLog', reducer)

const ActivityLog = () => {
    const token = useSelector((state) => state.auth.session.token)
    const userRole = useSelector((state) => state.auth.user.authority)
    const userId = useSelector((state) => state.auth.user.userId)

    const [list, setList] = useState()
    const [openRange, setOpenRange] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserSale(
                { userId: userRole[0] === 'admin' ? '' : userId },
                token
            )
            if (data) {
                setList(data)
            }
        }
        fetchData()
    }, [userId])

    const [value, setValue] = useState([
        dayjs(new Date()).add(-5, 'days').toDate(),
        new Date(),
    ])

    const filterWithDate = async () => {
        const data = await filterByDate(
            { startDate: value[0], endDate: value[1],  userId: userRole[0] === 'admin' ? '' : userId },
            token
        )
        if (data) {
            setList(data)
        }
        setOpenRange(false)
    }

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const fullTotalPrice = list?.reduce(
            (total, item) => total + item.totalPrice,
            0
        )
        setTotalPrice(fullTotalPrice)
    }, [list])

    if (!list?.length) return <h3>თქვენი გაყიდვები ვერ მოიძებნა</h3>
    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="mb-[30px]">ჩემი გაყიდვები</h3>
                {openRange && (
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setOpenRange(false)
                        }}
                    >
                        <div className="p-[14px] absolute shadow-md bg-white border-black important top-[45px] right-[86px] calendar-icon-filter md:w-[290px] max-w-[290px] mx-auto dark:bg-gray-900">
                            <RangeCalendar value={value} onChange={setValue} />
                            <Button
                                size={'sm'}
                                className="ml-[192px]"
                                onClick={filterWithDate}
                                variant="solid"
                            >
                                ძებნა
                            </Button>
                        </div>
                    </OutsideClickHandler>
                )}
                <HiOutlineCalendar
                    className="cursor-pointer w-[53px] pointer h-[28px] mb-[16px] mt-[-15px] !important  calendar-icon-filter"
                    onClick={() => setOpenRange(!openRange)}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                <StatisticCard
                    icon={<HiOutlineUserGroup />}
                    avatarClass="!bg-indigo-600"
                    label="რაოდენობა"
                    value={list?.length}
                    growthRate={0}
                    loading={!list}
                    className="mr-[15px]"
                />
                <StatisticCard
                    icon={<HiCash />}
                    avatarClass="!bg-green-600"
                    label="სრული ღირებულება"
                    value={totalPrice}
                    growthRate={0}
                    loading={!list}
                    priceType
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {list?.map((item, index) => (
                    <GridItem key={index} item={item} />
                ))}
            </div>
        </>
    )
}

export default ActivityLog
