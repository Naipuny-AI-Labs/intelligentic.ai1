import express from 'express'
import onboarduserController from '../../controllers/onboarduser'
const router = express.Router()

// CREATE
router.post('/', onboarduserController.saveOnBoardUser)
router.post('/changestatus', onboarduserController.changeOnBoardUserStatus)

export default router
