export type MockMode = 'success' | 'empty' | 'error' | 'slow'

export interface MockRequestOptions {
  mode?: MockMode
  delay?: number
  errorMessage?: string
}

export async function mockRequest<T>(
  data: T | T[],
  options: MockRequestOptions = {},
): Promise<T | T[]> {
  const { mode = 'success', delay = 400, errorMessage = 'Ошибка сервера' } = options

  const actualDelay = mode === 'slow' ? 3000 : delay
  await new Promise((r) => setTimeout(r, actualDelay))

  if (mode === 'error') {
    throw new Error(errorMessage)
  }

  if (mode === 'empty') {
    return Array.isArray(data) ? [] : ({} as T)
  }

  return data
}

export async function mockList<T>(
  data: T[],
  options: MockRequestOptions = {},
): Promise<T[]> {
  const result = await mockRequest(data, options)
  return result as T[]
}

export async function mockItem<T>(
  data: T,
  options: MockRequestOptions = {},
): Promise<T> {
  const result = await mockRequest(data, options)
  return result as T
}
