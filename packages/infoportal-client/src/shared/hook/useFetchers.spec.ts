import {render, act, waitFor, renderHook} from '@testing-library/react'
import {useFetchers} from './useFetchers'

const mockFetcher = jest.fn(async (id: number) => {
  await new Promise((res) => setTimeout(res, 100)) // Simulate async delay
  if (id === 999) throw new Error('Test error')
  return {data: `Fetched data for ${id}`}
})

describe('useFetchers with caching based on requestKey', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch and cache data for a specific id', async () => {
    const {result} = renderHook(() => useFetchers(mockFetcher, {requestKey: (args: [number]) => args[0]}))

    // First fetch for id 1
    act(() => {
      result.current.fetch({force: true}, 1)
    })

    await waitFor(() => expect(result.current.anyLoading).toBe(false))

    // Ensure data is cached for id 1
    expect(result.current.getAsMap.get(1)).toEqual({data: 'Fetched data for 1'})
    expect(result.current.anyLoading).toBe(false)

    // Fetch again for id 1 (should use cache)
    act(() => {
      result.current.fetch({force: false}, 1)
    })

    // Ensure fetch is not called again for id 1
    expect(mockFetcher).toHaveBeenCalledTimes(1)

    // Fetch data for a new id (id 2)
    act(() => {
      result.current.fetch({force: true}, 2)
    })

    await waitFor(() => expect(result.current.getAsMap.get(2)).toEqual({data: 'Fetched data for 2'}))
  })

  it('should handle errors and cache failed requests', async () => {
    const {result} = renderHook(() => useFetchers(mockFetcher, {requestKey: (args: [number]) => args[0]}))

    // Fetch for id 999 (which will throw an error)
    act(() => {
      result.current.fetch({force: true}, 999)
    })

    await waitFor(() => expect(result.current.anyLoading).toBe(false))

    // Ensure error is captured
    expect(result.current.lastError).toEqual(new Error('Test error'))
    expect(result.current.error[999]).toEqual(new Error('Test error'))
    expect(result.current.anyError).toBe(true)
    expect(result.current.anyLoading).toBe(false)

    // Fetch for id 999 again (should still return the error from the cache)
    act(() => {
      result.current.fetch({force: false}, 999)
    })

    await waitFor(() => expect(result.current.anyLoading).toBe(false))
    // Ensure the fetcher isn't called again and the error is reused
    expect(mockFetcher).toHaveBeenCalledTimes(2)
    expect(result.current.error[999]).toEqual(new Error('Test error'))
  })

  it('should use cache and prevent refetch for the same id when force is false', async () => {
    const {result} = renderHook(() => useFetchers(mockFetcher, {requestKey: (args: [number]) => args[0]}))

    // First fetch for id 3
    act(() => {
      result.current.fetch({force: true}, 3)
    })

    await waitFor(() => expect(result.current.getAsMap.get(3)).toEqual({data: 'Fetched data for 3'}))

    // Fetch again for id 3 with force: false
    act(() => {
      result.current.fetch({force: false}, 3)
    })

    // Ensure fetch is not called again for id 3
    expect(mockFetcher).toHaveBeenCalledTimes(1)
  })

  it('should clear cache correctly', async () => {
    const {result} = renderHook(() => useFetchers(mockFetcher, {requestKey: (args: [number]) => args[0]}))

    // First fetch for id 4
    act(() => {
      result.current.fetch({force: true}, 4)
    })

    await waitFor(() => expect(result.current.getAsMap.get(4)).toEqual({data: 'Fetched data for 4'}))

    // Clear cache
    act(() => {
      result.current.clearCache()
    })

    // After clearing the cache, ensure data for id 4 is removed
    expect(result.current.getAsMap.get(4)).toBeUndefined()

    // Fetch again for id 4 after clearing cache
    act(() => {
      result.current.fetch({force: true}, 4)
    })

    await waitFor(() => expect(result.current.getAsMap.get(4)).toEqual({data: 'Fetched data for 4'}))
  })
})
