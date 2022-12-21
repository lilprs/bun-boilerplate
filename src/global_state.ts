export type GlobalState = {
  initialized: boolean
  reload_count: number
}

export const global_state =
  globalThis as unknown as GlobalState
