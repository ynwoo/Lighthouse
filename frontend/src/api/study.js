import { authApiInstance, authFormInstance } from '.'

const authApi = authApiInstance()
const authFormApi = authFormInstance()

async function getDetailStudy(studyId, success, fail) {
  await authApi.get(`/study/${studyId}`).then(success).catch(fail)
}

async function createStudy(studyId, success, fail) {
  await authApi.post(`/study/${studyId}`).then(success).catch(fail)
}

async function updateStudy(study, success, fail) {
  await authFormApi.put(`/study`, study).then(success).catch(fail)
}

export { getDetailStudy, createStudy, updateStudy }
