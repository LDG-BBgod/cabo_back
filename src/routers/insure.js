const express = require('express')

const router = express.Router()

const { Insure, InsureTest } = require('../routersFunc/index')

router.post('/', Insure.createDocker)
router.post('/pageInit', Insure.pageInit)
router.post('/getSixNum', Insure.getSixNum)
router.post('/authSixNum', Insure.authSixNum)
router.post('/reGetSixNum', Insure.reGetSixNum)
router.post('/getExistCar', Insure.getExistCar)
router.post('/selectExistCar', Insure.selectExistCar)
router.post('/newContract', Insure.newContract)
router.post('/newCarSelect', Insure.newCarSelect)
router.post('/getExistCarInfo', Insure.getExistCarInfo)
router.post('/selectExistContractInfo', Insure.selectExistContractInfo)
router.post('/selectNewContractInfo', Insure.selectNewContractInfo)
router.post('/selectAddCarInfo', Insure.selectAddCarInfo)
router.post('/goResultStep', Insure.goResultStep)
router.post('/getResult', Insure.getResult)

module.exports = router
