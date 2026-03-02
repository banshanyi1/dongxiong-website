import { casesMock } from './sources/cases.js'

export function mockGet(url) {
  if (url === '/cases') {
    return casesMock.list()
  }
  if (url.startsWith('/cases/')) {
    const id = url.split('/').pop()
    return casesMock.detail(id)
  }
  throw new Error(`No mock for GET ${url}`)
}

