import React from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/TrainersTable'
import CustomersTableTools from './components/TrainerTableTools'
import CustomerStatistic from './components/TrainerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmCustomers', reducer)

const Customers = () => {
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

export default Customers
