import {ProtectRoute} from '@/core/Session/SessionContext'
import Legal from '@/features/Legal'

const LegalPage = () => {
  return (
    <ProtectRoute>
      <Legal />
    </ProtectRoute>
  )
}

export default LegalPage
