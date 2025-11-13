import {ProtectRoute} from '@/core/Session/SessionContext'
import {Communications} from '@/features/Communications'

export default () => {
  try {
    return (
      <ProtectRoute>
        <Communications />
      </ProtectRoute>
    )
  } catch (error) {
    console.error('An error rendering Communications occured', error)
    return <div>Error: {String(error)}</div>
  }
}
