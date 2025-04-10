import { Request, Response, NextFunction } from 'express'
import userService from '../../services/user'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { StatusCodes } from 'http-status-codes'
import { generateAPIKey } from '../../utils/apiKey'
import { getEncryptionKey } from '../../utils'
import { AES } from 'crypto-js'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: userController.createUser - body not provided!`)
        }
        const encryptKey = await getEncryptionKey()

        const password = AES.encrypt(req.body.password, encryptKey).toString()
        req.body.password = password
        req.body.apikey = generateAPIKey()
        const apiResponse = await userService.createUser(req.body)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: userController.deleteUser - id not provided!`)
        }
        const apiResponse = await userService.deleteUser(req.params.id)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await userService.getAllUsers()
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: userController.getUserById - id not provided!`)
        }
        const apiResponse = await userService.getUserById(req.params.id)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: userController.updateUser - id not provided!`)
        }
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: userController.updateUser - body not provided!`)
        }
        const apiResponse = await userService.updateUser(req.params.id, req.body)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
}
