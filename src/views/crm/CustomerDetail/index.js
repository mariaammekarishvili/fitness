import React, { useEffect, useState } from 'react'
import {
    AdaptableCard,
    Loading,
    Container,
    DoubleSidedImage,
    IconText,
} from 'components/shared'
import CustomerProfile from './components/CustomerProfile'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import isEmpty from 'lodash/isEmpty'
import useQuery from 'utils/hooks/useQuery'
import { getUserPersonalInformation } from 'services/CrmService'
import { Card, Dialog, Tag, Button } from 'components/ui'
import {
    fetchCostumerSale,
    fetchUserSale,
    filterSaleList,
} from 'services/Sales'
import { HiCalendar, HiCash } from 'react-icons/hi'
import dayjs from 'dayjs'
import AbonimentsCard from './components/AbonimentsCard'

injectReducer('crmCustomerDetails', reducer)

const CustomerDetail = () => {
    const dispatch = useDispatch()

    const query = useQuery()

    const token = useSelector((state) => state.auth.session.token)

    // const data = useSelector(
    //     (state) => state.crmCustomerDetails.data
    // )
    const loading = useSelector(
        (state) => state.crmCustomerDetails.data.loading
    )
    const [data, setData] = useState([])
    const [salesData, setSalesData] = useState([])

    useEffect(() => {
        const id = query.get('id')

        const fetchData = async () => {
            const data = await getUserPersonalInformation({ id }, token)
            if (data) {
                setData(data)
            }
        }
        const fetchSales = async () => {
            const data = await fetchCostumerSale({ costumerId: id }, token)
            if (data) {
                setSalesData(data)
            }
        }
        fetchSales()
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isOpen, setIsOpen] = useState(false)
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }
    console.log('salesData', salesData)
    return (
        <Container className="h-full">
            {/* <Loading loading={loading}> */}
            {/* {!isEmpty(data) && ( */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <CustomerProfile item={data} isCustomer={true} />
                </div>
                <div className="grid col-span-2 grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                    {salesData.map((item) => (
                        <AbonimentsCard key={item.salesID} item={item} token={token} />
                    ))}
                </div>
                <div className="w-full">
                    <AdaptableCard>
                        {/* <Button
                            className="mr-2 mb-1"
                            variant="solid"
                            color="yellow-600"
                            onClick={openDialog}
                        >
                            ვიზიტის გატარება
                        </Button> */}
                        <Dialog
                            isOpen={isOpen}
                            onClose={onDialogClose}
                            onRequestClose={onDialogClose}
                        >
                            <div className="flex-col flex items-center center column pt-[15px]">
                                <h5 className="mb-4">
                                    ნამდვილად გსურთ ვიზიტის ხელით გატარება?
                                </h5>
                                <div className="text-right mt-6">
                                    <Button
                                        className="ltr:mr-2 border rtl:ml-2"
                                        variant="plain"
                                        onClick={onDialogClose}
                                    >
                                        არა
                                    </Button>
                                    <Button
                                        color="yellow-600"
                                        variant="solid"
                                        onClick={null}
                                    >
                                        დიახ
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                        {/* <CurrentSubscription />
                                <PaymentHistory />
                                <PaymentMethods data={data.paymentMethod} /> */}
                    </AdaptableCard>
                </div>
            </div>
            {/* )} */}
            {/* </Loading> */}
            {!loading && isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
        </Container>
    )
}

export default CustomerDetail
