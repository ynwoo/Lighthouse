import { authApiInstance, authFormInstance } from '.'

const authApi = authApiInstance()
const authFormApi = authFormInstance()

async function getStudyAll(options, success, fail) {
  let uri = '/study?'
  Object.keys(options).forEach((option, index) => {
    if (option === 'tagIds') {
      if (!option.length) {
        console.log('tag', options[option])
        options[option]?.forEach(tagId => {
          uri += `${option}=${tagId}`
        })
        uri += '&'
      }
    } else {
      if (index !== 0) uri += '&'
      uri += `${option}=${options[option]}`
    }
  })
  console.log(uri)
  await authApi.get(uri).then(success).catch(fail)
}

async function getDetailStudy(studyId, success, fail) {
  await authApi.get(`/study/${studyId}`).then(success).catch(fail)
}

async function createStudy(studyId, success, fail) {
  await authApi.post(`/study/${studyId}`).then(success).catch(fail)
}

async function updateStudy(study, success, fail) {
  await authFormApi.put(`/study`, study).then(success).catch(fail)
}

export { getStudyAll, getDetailStudy, createStudy, updateStudy }
