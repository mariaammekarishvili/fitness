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
    idCard: Yup.string()
        .min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('მეილის ფორმატი არასწორია'),
    mobile: Yup.string()
        .max(12, 'ციფრების რაოდენობა არ უნდა აღემატებოდეს 12-ს')
        .matches(/^[0-9]{9}$/, 'შეიყვანეთ მხოლოდ ციფრები')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue
            }
            const date = new Date(originalValue)
            return isNaN(date) ? undefined : date
        })
        .typeError('  ფორმატი არასწორია')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'მომავალი დროის შეყანა შეუძლებელია'),
    gander: Yup.string()
        .oneOf(['male', 'female', 'non-binary', 'other'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    status: Yup.string()
        .oneOf(['silver', 'gold', 'platinium'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    turniketCode: Yup.string()
        .min(7, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
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
    idCard: Yup.string()
        .min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    mobile: Yup.string()
        .max(12, 'ციფრების რაოდენობა არ უნდა აღემატებოდეს 12-ს')
        .matches(/^[0-9]{9}$/, 'შეიყვანეთ მხოლოდ ციფრები')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue
            }
            const date = new Date(originalValue)
            return isNaN(date) ? undefined : date
        })
        .typeError('  ფორმატი არასწორია')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'მომავალი დროის შეყანა შეუძლებელია'),
    gander: Yup.string()
        .oneOf(['male', 'female'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
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
    idCard: Yup.string()
        .min(9, 'ინფორმაცია ძალიან მცირეა')
        .max(16, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    mobile: Yup.string()
        .max(12, 'ციფრების რაოდენობა არ უნდა აღემატებოდეს 12-ს')
        .matches(/^[0-9]{9}$/, 'შეიყვანეთ მხოლოდ ციფრები')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    email: Yup.string().email('მეილის ფორმატი არასწორია'),
    address: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    birthday: Yup.date()
        .transform((value, originalValue) => {
            if (originalValue instanceof Date) {
                return originalValue
            }
            const date = new Date(originalValue)
            return isNaN(date) ? undefined : date
        })
        .typeError('ფორმატი არასწორია')
        .required('ინფორმაციის შეყვანა სავალდებულოა')
        .max(new Date(), 'მომავალი დროის შეყანა შეუძლებელია'),
    gander: Yup.string()
        .oneOf(['male', 'female'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    role: Yup.string()
        .oneOf(['basic', 'admin'])
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    password: Yup.string()
        .min(6, 'ინფორმაცია ძალიან მცირეა')
        .required('პაროლის დაყენება სავალდებულოა'),
})

export const ValidationSchemaAboniment = Yup.object().shape({
    name: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    maxEntries: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    countStartsDays: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
})

export const ValidationSchemaWorkout = Yup.object().shape({
    name: Yup.string()
        .min(2, 'ინფორმაცია ძალიან მცირეა!')
        .max(20, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    price: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    capacity: Yup.string()
        .min(1, 'ინფორმაცია ძალიან მცირეა')
        .max(8, 'ინფორმაცია ზედმეტად დიდია')
        .required('ინფორმაციის შეყვანა სავალდებულოა'),
    timeOfTheDay: Yup.string()
        .required('Time is required')
        .matches(
            /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'ფორმატი არასწორია, (მაგალითად: 22:00)'
        ),
    weekDays: Yup.array().min(1, 'მონიშნეთ მინიმუმ 1 დღე'),
    // .required('ერთი დღე მაინც უნდა იყოს მონიშნული'),
})
