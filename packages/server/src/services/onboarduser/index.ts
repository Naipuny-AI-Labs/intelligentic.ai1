import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { OnBoardUser } from '../../database/entities/OnBoardUser'

const saveOnBoardUser = async (onBoardUser: OnBoardUser): Promise<any> => {
    console.log('service', onBoardUser)
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

export default {
    saveOnBoardUser
}
