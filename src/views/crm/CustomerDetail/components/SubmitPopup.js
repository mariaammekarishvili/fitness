const { Button, Dialog, Alert } = require('components/ui')

const SubmitPopup = ({ feedback, isOpen, setIsOpen, SubmitFunction, text }) => {
    const onDialogClose = (e) => {
        setIsOpen(false)
    }
    return (
        <>
            <Dialog
                isOpen={isOpen}
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
                            : 'ცვლილება წარმატებით განხორციელდა'}
                    </Alert>
                )}
                {!feedback && (
                    <div className="flex-col flex items-center center column pt-[15px]">
                        <h5 className="mb-4">{text}</h5>
                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 border rtl:ml-2"
                                variant="plain"
                                onClick={onDialogClose}
                            >
                                არა
                            </Button>
                            <Button
                                color="green-500"
                                variant="solid"
                                onClick={SubmitFunction}
                            >
                                დიახ
                            </Button>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
}

export default SubmitPopup
