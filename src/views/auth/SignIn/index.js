import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Fitness</h3>
                <p>ავტორიზაციისთვის გთხოვთ შეიყვანოთ ინფორმაცია</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
