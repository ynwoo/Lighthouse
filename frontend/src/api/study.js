import { apiInstance, authApiInstance, authFormInstance } from '.'

const api = apiInstance()
const authApi = authApiInstance()
const authFormApi = authFormInstance()

// studyList 검색
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
  await api.get(uri).then(success).catch(fail)
}

// 스터디 상세 조회
async function getDetailStudy(studyId, success, fail) {
  await authApi.get(`/study/${studyId}`).then(success).catch(fail)
}

// 스터디 복제
async function createStudy(studyId, success, fail) {
  await authApi.post(`/study/${studyId}`).then(success).catch(fail)
}

// 스터디 수정
async function updateStudy(study, success, fail) {
  await authFormApi.put(`/study`, study).then(success).catch(fail)
}

export { getStudyAll, getDetailStudy, createStudy, updateStudy }
