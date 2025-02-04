import {renderHook, act, waitFor} from '@testing-library/react'
import {useFetcher} from './useFetcher'
import {sleep} from '@alexandreannic/ts-utils'

const mockFetcher = jest.fn(async (id: number) => {
  await new Promise((res) => setTimeout(res, 100)) // Simulate async delay
  if (id === 999) throw new Error('Test error')
  return {data: `Fetched data for ${id}`}
})

describe('useFetcher hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should initialize with correct default values', () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    expect(result.current.get).toBeUndefined()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeUndefined()
    expect(result.current.callIndex).toBe(0)
  })

  test('should fetch data and update state', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({}, 1)
    })
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.get).toEqual({data: 'Fetched data for 1'})
    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })

  test('should not refetch if request is already running', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({force: false}, 1)
      result.current.fetch({force: false}, 1) // Duplicate call
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })

  test('should reuse cached data if force=false', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({}, 1)
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.fetch({force: false}, 1)
    })
    expect(mockFetcher).toHaveBeenCalledTimes(1)
    expect(result.current.get).toEqual({data: 'Fetched data for 1'})
  })

  test('should force refetch when force=true', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({}, 1)
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.fetch({force: true}, 1)
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(mockFetcher).toHaveBeenCalledTimes(2) // Should refetch
  })

  test('should handle errors correctly', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({}, 999) // Triggers an error
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error.message).toBe('Test error')
  })

  test('should clear cache correctly', async () => {
    const {result} = renderHook(() => useFetcher(mockFetcher))
    act(() => {
      result.current.fetch({}, 1)
    })
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.clearCache()
    })
    expect(result.current.get).toBeUndefined()
    expect(result.current.error).toBeUndefined()
  })
})
