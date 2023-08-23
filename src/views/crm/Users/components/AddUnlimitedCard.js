import { Alert, Button, Dialog } from "components/ui"
import { useState } from "react"
import { useSelector } from "react-redux"
import { addUnlimitedCard } from "services/UserService"


const AddUnlimitedCard = ({
    changeIsOpen,
    setChangeIsOpen,
}) => {
    const onDialogClose = () => {
        setChangeIsOpen(false)
    }

    const token = useSelector((state) => state.auth.session.token)

    const [feedback, setFeedback] = useState('')
    const [newTurniketCode, setNewTurniketCode] = useState('')

    console.log('token', token)

    const updateTurniketCode = async () => {
        try {
            await addUnlimitedCard(token, newTurniketCode)
            setFeedback('success')
            setNewTurniketCode('')
            setTimeout(() => {
                setChangeIsOpen(false)
                setFeedback('')
            }, 3000)
        } catch (error) {
            setFeedback('danger')
            setNewTurniketCode('')
            setTimeout(() => {
                setChangeIsOpen(false)
                setFeedback('')
            }, 3000)
            // Handle error, e.g., show an error message or log the error
        }
    }
    return(
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
                        : 'ბარათი წარმატებით განახლდა'}
                </Alert>
            )}
            {!feedback && (
                <div className="flex-col flex items-center center column pt-[15px]">
                    <h5 className="mb-4">შეიყვანეთ ახალი ბარათის ID</h5>
                    <input
                        type="text"
                        className="border rounded py-2 px-3 focus:outline-none focus:ring w-[90%] focus:border-blue-600"
                        placeholder="შეიყვანეთ ტურნიკეტის კოდი"
                        value={newTurniketCode}
                        onChange={(e) => setNewTurniketCode(e.target.value)}
                    ></input>
                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 border rtl:ml-2 green-600"
                            variant={newTurniketCode ? "solid" : ''}
                            onClick={newTurniketCode ? updateTurniketCode : null}
                        >
                            დამატება
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

export default AddUnlimitedCard