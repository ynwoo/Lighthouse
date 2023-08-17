import { authApiInstance } from '.'

const authApi = authApiInstance()

async function participateStudy(studyId, success, fail) {
  await authApi
    .post(`/participation-history/${studyId}`)
    .then(success)
    .catch(fail)
}

async function joinStudy({ studyId, userId }, success, fail) {
  await authApi
    .put(`/participation-history/${studyId}/${userId}`)
    .then(success)
    .catch(fail)
}

async function leaveStudy(studyId, success, fail) {
  await authApi
    .delete(`/participation-history/${studyId}`)
    .then(success)
    .catch(fail)
}

async function rejectStudy({ studyId, userId }, success, fail) {
  await authApi
    .delete(`/participation-history/${studyId}/${userId}`)
    .then(success)
    .catch(fail)
}

export { participateStudy, joinStudy, leaveStudy, rejectStudy }
