import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { OnBoardUser } from '../../database/entities/OnBoardUser'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import onboarduserService from '../../services/onboarduser'

const getOnBoardUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await onboarduserService.getOnBoardUsers()
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const saveOnBoardUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.saveOnboardUser - body not provided!`)
        }
        const body = req.body
        let onboardUser = new OnBoardUser()
        Object.assign(onboardUser, body)
        const apiResponse = await onboarduserService.saveOnBoardUser(onboardUser)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const changeOnBoardUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(
                StatusCodes.PRECONDITION_FAILED,
                `Error: onboardUserRouter.chageOnboardUserStatus - body not provided!`
            )
        }
        const body = req.body
        const apiResponse = await onboarduserService.changeOnBoardUserStatus({ userId: body.userId, status: body.status })
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    getOnBoardUsers,
    saveOnBoardUser,
    changeOnBoardUserStatus
}
