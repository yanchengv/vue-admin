import axios from 'axios'
import { ElMessage } from 'element-plus'
// create an axios instance
const service = axios.create({
    baseURL: "http://localhost:9000/", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
    headers: { "content-type": "application/json" }
    //,"Access-Control-Allow-Origin": "*","Access-Control-Allow-Headers": "X-Requested-With,Content-Type","Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
})

service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }

    },

    error => {
        console.log('err' + error) // for debug
        ElMessage({
          message: error.msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
)
export default service