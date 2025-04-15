import express from 'express'
import userController from '../../controllers/user'
const router = express.Router()

// CREATE
router.post('/', userController.createUser)

// READ
router.get('/', userController.getAllUsers)
router.get(['/', '/:id'], userController.getUserById)

// UPDATE
router.put(['/', '/:id'], userController.updateUser)

// DELETE
router.delete(['/', '/:id'], userController.deleteUser)

// CREATE
router.post('/login', userController.loginUser)

export default router
