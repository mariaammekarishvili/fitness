import * as Yup from 'yup'

export const ValidationSchemaCustomer = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    lastname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    idCard: Yup.string().min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    mobile: Yup.string().max(12, ('too much!'))
        .matches(/^[0-9]{9}$/, 'Mobile number must be exactly 9 digits')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue;
            }
            const date = new Date(originalValue);
            return isNaN(date) ? undefined : date;
        })
        .typeError('Invalid date')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'Date cannot be in the future'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})


export const ValidationSchemaTrainer = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    lastname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    idCard: Yup.string().min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    mobile: Yup.string().max(12, ('too much!'))
        .matches(/^[0-9]{9}$/, 'Mobile number must be exactly 9 digits')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue;
            }
            const date = new Date(originalValue);
            return isNaN(date) ? undefined : date;
        })
        .typeError('Invalid date')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'Date cannot be in the future'),
    gander: Yup.string()
        .oneOf(['male', 'female'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string().min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

export const ValidationSchemaUser = Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(12, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    lastname: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    idCard: Yup.string().min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    mobile: Yup.string().max(12, ('too much!'))
        .matches(/^[0-9]{9}$/, 'Mobile number must be exactly 9 digits')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue;
            }
            const date = new Date(originalValue);
            return isNaN(date) ? undefined : date;
        })
        .typeError('Invalid date')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'Date cannot be in the future'),
    gander: Yup.string()
        .oneOf(['male', 'female'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    role: Yup.string()
        .oneOf(['basic', 'admin'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    password: Yup.string().min(6, 'ინფორმაცია ძალიან მცირეა')
        .required('პაროლის დაყენება სავალდებულოა')
})