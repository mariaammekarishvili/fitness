import authRoute from './authRoute'
import appsRoute from './appsRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...appsRoute,
]
