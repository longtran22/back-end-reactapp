const express =require('express')
const router =express.Router()

const meController  = require('../controllers/MeController')

router.get('/stored/courses',meController.storedCourses)
// router.post('/store',meController.store)

// router.get('/:slug',meController.show)



module.exports = router