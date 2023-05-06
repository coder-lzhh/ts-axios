import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaderName(helpers: any, normalizedName: string): void {
  if (!helpers) {
    return
  }
  Object.keys(helpers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      helpers[normalizedName] = helpers[name]
      delete helpers[name]
    }
  })
}

export function processHeaders(helpers: any, data: any) {
  normalizeHeaderName(helpers, 'Content-Type')
  if (isPlainObject(data)) {
    if (helpers && !helpers['Content-Type']) {
      helpers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return helpers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
