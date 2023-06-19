import React from 'react'
import { Card, Dialog } from 'components/ui'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import CustomerProfile from 'views/crm/CustomerDetail/components/CustomerProfile'

const GridItem = ({ item }) => {
    const name = item.customer ? item.customer?.firstname + ' ' +item.customer?.lastname :''
    const [dialogIsOpen, setIsOpen] = React.useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    return (
        <>
            <Card bodyClass="h-full cursor-pointer" onClick={() => openDialog()}>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex justify-between">
                        {/* <Link to="/app/scrum-board"> */}
                        <h6>
                            {' '}
                            {item.customer?.firstname}{' '}
                            {item?.customer?.lastname} <br />
                            პ/ნ: {item?.customer?.idCard}
                        </h6>
                        {/* </Link> */}
                    </div>
                    <p className="mt-4">
                        T: {item.customer?.mobile} <br />
                        {item?.aboniment?.name}
                        <br /> საშეღავათო პერიოდი:{' '}
                        {item?.aboniment?.countStartsDays}
                        <br /> შესვლის რაოდენობა: {item?.aboniment?.maxEntries}
                        <br /> გამყიდველი: {item?.user?.firstname} {item?.user.lastname}
                    </p>
                    <div className="mt-3">
                        <ProgressionBar progression={100} />
                        <div className="flex items-center justify-between mt-2">
                            <Members members={[{ name: name?.toUpperCase() }]} />
                            <div className="flex items-center rounded-full font-semibold mt-[10px]">
                                <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                    <span className="ml-1 text-green-500 rtl:mr-1 whitespace-nowrap">
                                        {item?.totalPrice}₾
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <CustomerProfile item={item} />
            </Dialog>
        </>
    )
}

export default GridItem
