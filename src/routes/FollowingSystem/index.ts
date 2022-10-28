import expressWrapper from '../../helpers/expressWrapper'
import express from 'express'
import FollowingSystem from '../../controllers/FollowingSystem'
import isAuth from '../../middlewares/isAuth'
const router = express.Router()

router.get('/users', expressWrapper(FollowingSystem.allUsers))

router.get('/users/:userId/followers', expressWrapper(FollowingSystem.allFollowers))
router.get('/users/:userId/following', expressWrapper(FollowingSystem.allFollowings))
router.get('/users/:userId/blocked', expressWrapper(FollowingSystem.allBlocked))

router.use(expressWrapper(isAuth))
router.patch('/users/followers/:followerId', expressWrapper(FollowingSystem.follower))
router.patch('/users/following/:followingId', expressWrapper(FollowingSystem.following))
router.patch('/users/blocked/:blockId', expressWrapper(FollowingSystem.block))

export default router