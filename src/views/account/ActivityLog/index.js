import React, { useEffect, useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useSelector } from 'react-redux'
import { fetchUserSale } from 'services/Sales'
import GridItem from 'views/project/ProjectList/components/GridItem'
import { StatisticCard } from 'views/crm/Sales/components/UserStatistic'
import { HiCash, HiOutlineUserGroup } from 'react-icons/hi'

injectReducer('accountActivityLog', reducer)

const ActivityLog = () => {
    const userId = useSelector((state) => state.auth.user.userId)
    const token = useSelector((state) => state.auth.session.token)

    const [list, setList] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserSale({ userId }, token)
            if (data) {
                setList(data)
            }
        }
        fetchData()
    }, [userId])

    const DateComponent = ({ incomeDate }) => {
        const formattedDate = new Date(incomeDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })

        return <>{formattedDate}</>
    }

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        list?.map((item) => setTotalPrice(totalPrice + item.totalPrice))
    }, [list])

    if (!list?.length) return <h3>თქვენი გაყიდვები ვერ მოიძებნა</h3>
    return (
        <>
            <h3 className="mb-[30px]">ჩემი გაყიდვები</h3>
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
