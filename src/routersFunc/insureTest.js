const { exec } = require('child_process')
const axios = require('axios')

const routerFrom = async (req, res, path) => {
  console.log(`/insure/${path}`)
  const resBody = {
    err: false,
    msg: {},
  }
  try {
    await axios
      .post(`http://localhost:10000/${path}`, (body = req.body))
      .then((res) => {
        console.log(res.data)
        resBody.err = res.data.err
        resBody.msg = res.data.msg
      })
      .catch(() => {
        resBody.err = true
      })
  } catch (err) {
    resBody.err = true
  }
  res.send(resBody)
}

/////////////////////
// 라우터 함수 모음//
/////////////////////
// 빈 함수, 사용하지 않는 함수,
const createDocker = async (req, res) => {
  console.log('post /insure/createDocker')
  const resBody = {
    err: false,
    msg: {},
  }

  res.send(resBody)
}

const pageInit = async (req, res) => {
  routerFrom(req, res, 'pageInit')
}

const getSixNum = async (req, res) => {
  routerFrom(req, res, 'getSixNum')
}

const reGetSixNum = async (req, res) => {
  routerFrom(req, res, 'reGetSixNum')
}

const authSixNum = async (req, res) => {
  routerFrom(req, res, 'authSixNum')
}

const getExistCar = async (req, res) => {
  routerFrom(req, res, 'getExistCar')
}

const selectExistCar = async (req, res) => {
  routerFrom(req, res, 'selectExistCar')
}

const newContract = async (req, res) => {
  routerFrom(req, res, 'newContract')
}

const newCarSelect = async (req, res) => {
  routerFrom(req, res, 'newCarSelect')
}

const getExistCarInfo = async (req, res) => {
  routerFrom(req, res, 'getExistCarInfo')
}

const selectExistContractInfo = async (req, res) => {
  routerFrom(req, res, 'selectExistContractInfo')
}

const selectNewContractInfo = async (req, res) => {
  routerFrom(req, res, 'selectNewContractInfo')
}

const selectAddCarInfo = async (req, res) => {
  routerFrom(req, res, 'selectAddCarInfo')
}

const goResultStep = async (req, res) => {
  routerFrom(req, res, 'goResultStep')
}

const getResult = async (req, res) => {
  routerFrom(req, res, 'getResult')
}

module.exports = {
  createDocker,
  pageInit,
  getSixNum,
  reGetSixNum,
  authSixNum,
  getExistCar,
  selectExistCar,
  newContract,
  newCarSelect,
  getExistCarInfo,
  selectExistContractInfo,
  selectNewContractInfo,
  selectAddCarInfo,
  goResultStep,
  getResult,
}
