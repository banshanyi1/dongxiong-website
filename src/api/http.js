const BASE = import.meta.env.VITE_API_BASE || ''

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

export const http = {
  async get(url) {
    if (!BASE || BASE === 'mock') {
      const { mockGet } = await import('./mock/router.js')
      await sleep(120)
      return mockGet(url)
    }
    const res = await fetch(BASE + url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: 'include',
    })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `GET ${url} ${res.status}`)
    }
    const data = await res.json()
    return data
  },
}

