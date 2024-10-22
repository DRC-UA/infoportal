import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

/**
 * Workaround since we cannot use <Route index ...> since we put <HashRouter> in _app.tsx.
 * @param route
 */
export const useReactRouterDefaultRoute = (route: string) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(route)
  }, [])
}