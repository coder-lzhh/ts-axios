import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './teyps'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponsetData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig): any {
  const { url, params } = config
  return buildURL(url, params)
}
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformResponsetData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
