import { AxiosRequestConfig } from './teyps'
import { buildURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}
function transformUrl(config: AxiosRequestConfig): any {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
