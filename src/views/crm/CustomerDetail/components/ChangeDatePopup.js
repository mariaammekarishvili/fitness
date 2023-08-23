import { Alert, Button, Dialog } from 'components/ui'
import { useState } from 'react'
import { putUserNewTurniketCode } from 'services/CrmService'
import { updateSalesDate } from 'services/Sales'
import { updatePauseCustomer } from 'services/UserService'

export const ChangeDatePopup = ({
    changeIsOpen,
    setChangeIsOpen,
    id,
    token,
    oldStartDate,
    oldEndDate,
}) => {
    const onDialogClose = () => {
        setChangeIsOpen(false)
    }

    const [feedback, setFeedback] = useState('')
    const [startDate, setStartDate] = useState(oldStartDate)
    const [endDate, setEndDate] = useState(oldEndDate)

    const handlePauseUpdateClick = async () => {
        try {
            const data = { startDate: startDate, endDate: endDate }
            const updatedPauseCustomer = await updateSalesDate(token, id, data)
            console.log('Pause customer updated:', updatedPauseCustomer)
            setFeedback('success')
            setTimeout(() => {
                setChangeIsOpen(false)
                setFeedback('')
                setStartDate('')
                setEndDate('')
            }, 3000)
        } catch (error) {
            console.error('Error updating pause customer:', error)
            setFeedback('danger')
            setTimeout(() => {
                setChangeIsOpen(false)
                setStartDate('')
                setEndDate('')
                setFeedback('')
            }, 3000)
        }
    }

    return (
        <>
            <Dialog
                isOpen={changeIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                {feedback && (
                    <Alert
                        showIcon
                        className="mb-4 absolute top-[6px]"
                        type={feedback}
                    >
                        {feedback === 'danger'
                            ? 'დაფიქსირდა შეცდომა'
                            : 'დაპაუზება წარმატებით განხრციელდა'}
                    </Alert>
                )}
                {!feedback && (
                    <div className="flex-col flex items-center center column pt-[15px]">
                        <h5 className="mb-4">
                            შეიყვანეთ დაწყების და დასრულების თარიღები
                        </h5>
                        <div className="mr-[auto] mt-[15px] ml-[23px] mb-[10px]">
                            დაწყება
                        </div>
                        <input
                            type="date"
                            className="border rounded py-2 px-3 focus:outline-none focus:ring w-[90%] focus:border-blue-600"
                            placeholder="შეიყვანეთ რიცხვი"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        ></input>
                        <div className="mr-[auto] mt-[15px] ml-[23px] mb-[10px]">
                            დასრულება
                        </div>
                        <input
                            type="date"
                            className="border rounded py-2 px-3 focus:outline-none focus:ring w-[90%] focus:border-blue-600"
                            placeholder=""
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        ></input>
                        <div className="text-right mt-6 mb-[10px] ml-[23px]">
                            <Button
                                className="ltr:mr-2 border rtl:ml-2 orange-600"
                                variant={startDate && endDate ? 'solid' : ''}
                                onClick={
                                    (startDate && endDate) ?
                                    handlePauseUpdateClick : null
                                }
                            >
                                შეცვლა
                            </Button>
                            <Button
                                color="red-600"
                                // variant="solid"
                                onClick={onDialogClose}
                            >
                                გაუქმება
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
}
