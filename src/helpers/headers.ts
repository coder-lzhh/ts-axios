import { isPlainObject } from './util'

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
