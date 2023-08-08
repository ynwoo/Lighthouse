import { authApiInstance } from '.'

const authApi = authApiInstance()

async function getDetailStudy(studyId, success, fail) {
  await authApi.get(`/study/${studyId}`).then(success).catch(fail)
}

async function createStudy(studyId, success, fail) {
  await authApi.post(`/study/${studyId}`).then(success).catch(fail)
}

async function updateStudy(study, success, fail) {
  await authApi.put(`/study`, study).then(success).catch(fail)
}

export { getDetailStudy, createStudy, updateStudy }
