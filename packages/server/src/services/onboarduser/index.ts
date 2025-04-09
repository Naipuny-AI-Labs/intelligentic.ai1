import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { OnBoardUser } from '../../database/entities/OnBoardUser'

const saveOnBoardUser = async (onBoardUser: OnBoardUser): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        let dbResponse: OnBoardUser
        const user = appServer.AppDataSource.getRepository(OnBoardUser).create(onBoardUser)
        dbResponse = await appServer.AppDataSource.getRepository(OnBoardUser).save(user)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: onboardUserService.saveOnBoardUser - ${getErrorMessage(error)}`
        )
    }
}

const changeOnBoardUserStatus = async (requestBody: any): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        let onBoardUser = await appServer.AppDataSource.getRepository(OnBoardUser).findOneBy({
            id: requestBody.userId
        })
        if (!onBoardUser) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `User ${requestBody.userId} not found`)
        }
        onBoardUser = { ...onBoardUser, status: requestBody.status, updatedDate: new Date() }
        const dbResponse = await appServer.AppDataSource.getRepository(OnBoardUser).save(onBoardUser)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: onBoardUserService.changeOnBoardUserStatus - ${getErrorMessage(error)}`
        )
    }
}

export default {
    saveOnBoardUser,
    changeOnBoardUserStatus
}
