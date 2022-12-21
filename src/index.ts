import { global_state } from './global_state.js'
import { handleHttpRequest } from './http.js'

if (!global_state.initialized) {
  global_state.initialized = true
  global_state.reload_count = 0
} else {
  global_state.reload_count += 1
}

const handler = {
  port: 3000,
  fetch(req: Request): Response {
    console.log(`${req.method} ${req.url}`)
    return handleHttpRequest(req)
  },
}

export default handler
