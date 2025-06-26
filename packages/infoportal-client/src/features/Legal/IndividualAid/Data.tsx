import type {FC} from 'react'

import {KoboIndex} from 'infoportal-common'

import {DatabaseTable} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

const Data: FC = () => {
  return (
    <Page width="full">
      <Panel>
        <DatabaseTable formId={KoboIndex.byName('legal_individual_aid').id} />
      </Panel>
    </Page>
  )
}

export {Data}
