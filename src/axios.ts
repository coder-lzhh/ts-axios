import { AxiosInstance, AxiosRequestConfig } from './types'
import defaults from './defaults'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstenca(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstenca(defaults)
export default axios
