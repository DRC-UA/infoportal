import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

/**
 * Workaround since we cannot use <Route index ...> since we put <HashRouter> in _app.tsx.
 * @param route
 */
export const useReactRouterDefaultRoute = (route: string) => {
  const loc = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (loc.pathname === '/') navigate(route)
  }, [])
}