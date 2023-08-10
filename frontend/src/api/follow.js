import { authApiInstance } from '.'

const authApi = authApiInstance()

async function getFollowList(success, fail) {
  await authApi.get(`/users/follow`).then(success).catch(fail)
}

export default getFollowList
