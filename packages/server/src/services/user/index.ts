import { StatusCodes } from 'http-status-codes'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { User } from '../../database/entities/User'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'

const createUser = async (requestBody: any) => {
    try {
        console.log(requestBody)
        const appServer = getRunningExpressApp()
        const newUser = new User()
        Object.assign(newUser, requestBody)
        console.log('newUser', newUser)
        const user = await appServer.AppDataSource.getRepository(User).create(newUser)
        console.log('user', user)
        const dbResponse = await appServer.AppDataSource.getRepository(User).save(user)
        console.log(dbResponse)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.createUser - ${getErrorMessage(error)}`)
    }
}

// Delete user from database
const deleteUser = async (userId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const dbResponse = await appServer.AppDataSource.getRepository(User).delete({ id: userId })
        if (!dbResponse) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
        }
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.deleteUser - ${getErrorMessage(error)}`)
    }
}

const getAllUsers = async () => {
    try {
        const appServer = getRunningExpressApp()
        return await appServer.AppDataSource.getRepository(User).find()
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.getAllUsers - ${getErrorMessage(error)}`)
    }
}

const getUserById = async (userId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const user = await appServer.AppDataSource.getRepository(User).findOneBy({
            id: userId
        })
        if (!user) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
        }
        return user
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.createUser - ${getErrorMessage(error)}`)
    }
}

const updateUser = async (userId: string, requestBody: any): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const user = await appServer.AppDataSource.getRepository(User).findOneBy({
            id: userId
        })
        if (!user) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
        }
        Object.assign(user, requestBody)
        const dbResponse = await appServer.AppDataSource.getRepository(User).save(requestBody)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.updateUser - ${getErrorMessage(error)}`)
    }
}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
}
