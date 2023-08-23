import { Alert, Button, Dialog } from 'components/ui'
import { useState } from 'react'
import { putUserNewTurniketCode } from 'services/CrmService'
import { updatePauseCustomer } from 'services/UserService'

export const CostumerPausePopup = ({
    changeIsOpen,
    setChangeIsOpen,
    id,
    token,
}) => {
    const onDialogClose = () => {
        setChangeIsOpen(false)
    }

    const [feedback, setFeedback] = useState('')
    const [stopDate, setStopDate] = useState('29/09/2023')
console.log('token', token)

    const handlePauseUpdateClick = async () => {
        console.log('stopdate', stopDate)
        try {
            const updatedPauseCustomer = await updatePauseCustomer(token, id, stopDate)
            console.log('Pause customer updated:', updatedPauseCustomer)
            setFeedback('success')
            setTimeout(() => {
                setChangeIsOpen(false)
                setFeedback('')
                setStopDate('')
            }, 3000)
        } catch (error) {
            console.error('Error updating pause customer:', error)
            setFeedback('danger')
            setTimeout(() => {
                setChangeIsOpen(false)
                setStopDate('')
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
                        <h5 className="mb-4">შეიყვანეთ დასაპაუზებელი დღეების რაოდენობა</h5>
                        <input
                            type="number"
                            className="border rounded py-2 px-3 focus:outline-none focus:ring w-[90%] focus:border-blue-600"
                            placeholder="შეიყვანეთ რიცხვი"
                            value={stopDate}
                            onChange={(e) => setStopDate(e.target.value)}
                        ></input>
                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 border rtl:ml-2 orange-600"
                                variant="solid"
                                onClick={handlePauseUpdateClick}
                            >
                                დაპაუზება
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
