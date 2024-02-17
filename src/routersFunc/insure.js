const { exec } = require('child_process')
const axios = require('axios')

////////////////////////
// insure 내 함수 모음 //
////////////////////////
let availablePorts = new Set()
let userPortMap = {}
// 10001 ~ 10100  총 100개의 포트 풀 생성 및 userId 할당
for (let i = 10001; i <= 10100; i++) {
  availablePorts.add(i)
}
function getAvailablePort() {
  for (let port of availablePorts) {
    availablePorts.delete(port)
    return port
  }
}
function returnPort(port) {
  availablePorts.add(port)
}
function getPort(userId) {
  if (!userPortMap[userId]) {
    const port = getAvailablePort()
    userPortMap[userId] = port
    return port
  } else {
    return userPortMap[userId]
  }
}
function releasePort(userId) {
  if (userPortMap[userId]) {
    returnPort(userPortMap[userId])
    delete userPortMap[userId]
  }
}
function readPortToUserId(userId) {
  return userPortMap[userId]
}
/////////////////////
// 라우터 공용 함수//
/////////////////////

const routerFrom = async (req, res, path) => {
  console.log(`/insure/${path} 시작`)
  const resBody = {
    err: false,
    msg: {},
  }
  try {
    const { userId } = req.body
    const port = readPortToUserId(userId)
    await axios
      .post(`http://localhost:${port}/${path}`, (body = req.body))
      .then((res) => {
        console.log(`/insure/${path} 완료`)
        resBody.err = res.data.err
        resBody.msg = res.data.msg
      })
      .catch((err) => {
        console.log(`/insure/${path} 에러`)
        console.log(err)
        resBody.err = true
      })
  } catch (err) {
    resBody.err = true
  }
  res.send(resBody)
}

/////////////////////
//   라우터 구성   //
/////////////////////
const createDocker = async (req, res) => {
  console.log('post /insure')
  const resBody = {
    err: false,
    msg: {},
  }
  try {
    const { userId } = req.body
    console.log(userId)
    exec(
      `docker ps -q -f name=puppeteer-${userId}`,
      (psError, psStdout, psStderr) => {
        // 기존에 docker 컨테이너가 있는 경우 삭제 후 재생성
        if (psStdout) {
          releasePort(userId)
          exec(`docker rm -f puppeteer-${userId}`, () => {
            const port = getPort(userId)
            exec(
              `docker run -p ${port}:10000 --name puppeteer-${userId} puppeteer-container`,
            )
          })
          // 기존에 docker 컨테이너가 없는경우 컨테이너 생성
        } else {
          const port = getPort(userId)
          exec(
            `docker run -p ${port}:10000 --name puppeteer-${userId} puppeteer-container`,
          )
        }
      },
    )
    resBody.msg = { data: '성공' }
  } catch (err) {
    resBody.err = true
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

// 셧다운(도커제거, port반환)
const shutDwon = async (userId) => {
  if (readPortToUserId(userId)) {
    exec(`docker rm -f puppeteer-${userId}`)
    releasePort(userId)
  }
}

module.exports = {
  createDocker,
  pageInit,
  getSixNum,
  authSixNum,
  reGetSixNum,
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
  // 셧다운
  shutDwon,
}
