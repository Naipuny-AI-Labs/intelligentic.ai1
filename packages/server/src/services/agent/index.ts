import { StatusCodes } from 'http-status-codes'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'
import { Agent } from '../../database/entities/Agent'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'

const createAgent = async (requestBody: any) => {
    try {
        console.log(requestBody)
        const appServer = getRunningExpressApp()
        const newUser = new Agent()
        Object.assign(newUser, requestBody)
        const user = await appServer.AppDataSource.getRepository(Agent).create(newUser)
        const dbResponse = await appServer.AppDataSource.getRepository(Agent).save(user)
        console.log(dbResponse)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.createAgent - ${getErrorMessage(error)}`)
    }
}

// Delete agent from database
const deleteAgent = async (agentId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const dbResponse = await appServer.AppDataSource.getRepository(Agent).delete({ id: agentId })
        if (!dbResponse) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.deleteAgent - ${getErrorMessage(error)}`)
    }
}

const getAllAgents = async () => {
    try {
        const appServer = getRunningExpressApp()
        return await appServer.AppDataSource.getRepository(Agent).find()
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.getAllAgents - ${getErrorMessage(error)}`)
    }
}

const getAgentById = async (agentId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const agent = await appServer.AppDataSource.getRepository(Agent).findOneBy({
            id: agentId
        })
        if (!agent) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        return agent
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.getAgentById - ${getErrorMessage(error)}`)
    }
}

const updateAgent = async (agentId: string, requestBody: any): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const agent = await appServer.AppDataSource.getRepository(Agent).findOneBy({
            id: agentId
        })
        if (!agent) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        Object.assign(agent, requestBody)
        const dbResponse = await appServer.AppDataSource.getRepository(Agent).save(requestBody)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.updateAgent - ${getErrorMessage(error)}`)
    }
}

export default {
    createAgent,
    deleteAgent,
    getAllAgents,
    getAgentById,
    updateAgent
}
