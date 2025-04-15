import { StatusCodes } from 'http-status-codes'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { User } from '../../database/entities/User'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'
import { getEncryptionKey } from '../../utils'
import CryptoJS from 'crypto-js'

const createUser = async (requestBody: any) => {
    try {
        const appServer = getRunningExpressApp()
        const newUser = new User()
        Object.assign(newUser, requestBody)
        const user = await appServer.AppDataSource.getRepository(User).create(newUser)
        const dbResponse = await appServer.AppDataSource.getRepository(User).save(user)
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

const checkUserEmail = async (email: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const user = await appServer.AppDataSource.getRepository(User).findOneBy({
            email: email
        })
        const result = user ? true : false
        return result
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
        if (user.email !== requestBody.email) {
            const emailExists = await checkUserEmail(requestBody.email)
            if (emailExists) {
                throw new InternalFlowiseError(StatusCodes.BAD_GATEWAY, `Error: userController.createUser - email already exists!`)
            }
        }
        Object.assign(user, requestBody)
        const dbResponse = await appServer.AppDataSource.getRepository(User).save(requestBody)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.updateUser - ${getErrorMessage(error)}`)
    }
}

const validateUser = async (email: string, password: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const user = await appServer.AppDataSource.getRepository(User).findOneBy({
            email
        })
        if (!user) {
            throw new InternalFlowiseError(StatusCodes.UNAUTHORIZED, `Error: userService.valdiateUser - Unauthorized access`)
        }
        const encryptKey = await getEncryptionKey()

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, encryptKey).toString(CryptoJS.enc.Utf8)
        if (password !== decryptedPassword) {
            throw new InternalFlowiseError(StatusCodes.UNAUTHORIZED, `Error: userService.valdiateUser - Unauthorized access`)
        }
        return user
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: userService.createUser - ${getErrorMessage(error)}`)
    }
}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
    checkUserEmail,
    validateUser
}
