import { Request, Response, NextFunction } from 'express'
import agentService from '../../services/agent'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { StatusCodes } from 'http-status-codes'

const createAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: agentController.createAgent - body not provided!`)
        }
        console.log(req.body)
        const apiResponse = await agentService.createAgent(req.body)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const deleteAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: agentController.deleteAgent - id not provided!`)
        }
        const apiResponse = await agentService.deleteAgent(req.params.id)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllAgents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await agentService.getAllAgents()
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAgentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: agentController.getAgentById - id not provided!`)
        }
        const apiResponse = await agentService.getAgentById(req.params.id)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateAgent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: agentController.updateAgent - id not provided!`)
        }
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: agentController.updateAgent - body not provided!`)
        }
        const apiResponse = await agentService.updateAgent(req.params.id, req.body)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    createAgent,
    deleteAgent,
    getAllAgents,
    getAgentById,
    updateAgent
}
