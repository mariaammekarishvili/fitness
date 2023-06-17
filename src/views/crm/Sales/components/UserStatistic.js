import React, { useEffect } from 'react'
import { Card, Avatar } from 'components/ui'
import { MediaSkeleton, Loading } from 'components/shared'
import { getCustomerStatistic } from '../store/dataSlice'
import {
    HiOutlineUserGroup,
} from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import NumberFormat from 'react-number-format'

const StatisticCard = (props) => {
    const { icon, avatarClass, label, value, growthRate, loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumberFormat
                                    displayType="text"
                                    value={value}
                                    thousandSeparator
                                />
                            </h3>
                        </div>
                    </div>
                    {/* <GrowShrinkTag value={growthRate} suffix="%" /> */}
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = ({type}) => {
    const dispatch = useDispatch()

    
    const data = useSelector((state) => state.crmCustomers.data.filterData)

    const statisticData = useSelector(
        (state) => state.crmCustomers.data.statisticData
    )
    const loading = useSelector(
        (state) => state.crmCustomers.data.statisticLoading
    )
 

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineUserGroup />}
                avatarClass="!bg-indigo-600"
                label="რაოდენობა"
                value={data?.length}
                growthRate={statisticData?.totalCustomers?.growShrink}
                loading={!data}
            />
            {/* <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-blue-500"
                label="Active Customers"
                value={statisticData?.activeCustomers?.value}
                growthRate={statisticData?.activeCustomers?.growShrink}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-emerald-500"
                label="New Customers"
                value={statisticData?.newCustomers?.value}
                growthRate={statisticData?.newCustomers?.growShrink}
                loading={loading}
            /> */}
        </div>
    )
}

export default CustomerStatistic
