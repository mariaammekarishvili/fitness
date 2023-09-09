import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/UsersTable'
import CustomersTableTools from './components/UserTableTools'
import CustomerStatistic from './components/UserStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmCards', reducer)

const Cards = () => {
    return (
        <>
            <CustomerStatistic type />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools />
                <CustomersTable />
            </AdaptableCard>
        </>
    )
}

export default Cards
