import {Enum} from '@alexandreannic/ts-utils'
import {UserSession} from '@/core/sdk/server/session/Session'
import {appConfig} from '@/conf/AppConfig'
import {Access} from '@/core/sdk/server/access/Access'
import {KoboIndex} from '@infoportal-common'

export enum AppFeatureId {
  meal = 'meal',
  kobo_database = 'kobo_database',
  mpca = 'mpca',
  shelter = 'shelter',
  partnership = 'partnership',
  wfp_deduplication = 'wfp_deduplication',
  activity_info = 'activity_info',
  cfm = 'cfm',
  admin = 'admin',
  sandbox = 'sandbox',
  snapshot = 'snapshot',
  hdp = 'hdp',
  safety = 'safety',
  protection = 'protection',
}

export interface AppFeature {
  id: AppFeatureId
  name: string
  materialIcons: string
  color: string
  path: string
  showIf?: (_?: UserSession, a?: Access[]) => boolean | undefined
}

export const appFeaturesIndex: Record<AppFeatureId, AppFeature> = {
  kobo_database: {
    id: AppFeatureId.kobo_database,
    name: 'Kobo Databases',
    materialIcons: 'fact_check',
    color: '#259af4',
    path: '/database',
  },
  shelter: {
    id: AppFeatureId.shelter,
    name: 'Shelter',
    materialIcons: 'home_work',
    color: '#742020',
    path: '/shelter',
    showIf: (u, accesses) => {
      return u?.admin || accesses && !!accesses
        .filter(Access.filterByFeature(AppFeatureId.kobo_database))
        .find(_ => _.params?.koboFormId === KoboIndex.byName('shelter_nta').id)
    }
  },
  mpca: {
    id: AppFeatureId.mpca,
    name: 'MPCA & Basic Needs',
    materialIcons: 'savings',
    color: 'green',
    path: '/mpca',
    showIf: (u, accesses) => {
      return u?.admin || accesses && !!accesses
        .filter(Access.filterByFeature(AppFeatureId.kobo_database))
        .find(_ => _.params?.koboFormId === KoboIndex.byName('bn_re').id)
      // return u?.admin || accesses && !!accesses.find(_ => _.featureId === AppFeatureId.mpca)
    }
  },
  protection: {
    id: AppFeatureId.protection,
    name: 'Protection',
    // materialIcons: 'display_settings',
    materialIcons: 'diversity_3',
    color: '#418fde',
    path: '/protection',
    showIf: (u, accesses) => {
      return true
    }
  },
  hdp: {
    id: AppFeatureId.hdp,
    name: 'HDP',
    // materialIcons: 'display_settings',
    materialIcons: 'rocket_launch',
    color: '#027ca2',
    path: '/hdp',
    showIf: (u, accesses) => {
      return u?.admin
    }
  },
  safety: {
    id: AppFeatureId.safety,
    name: 'Safety',
    // materialIcons: 'display_settings',
    materialIcons: 'security',
    color: '#dd2222',
    path: '/safety',
    showIf: (u, accesses) => {
      return true
    }
  },
  meal: {
    id: AppFeatureId.meal,
    name: 'MEAL',
    // materialIcons: 'display_settings',
    materialIcons: 'troubleshoot',
    color: '#1f9b97',
    path: '/meal',
    showIf: (u, accesses) => {
      return true
      // u?.admin || accesses && !!accesses
      //   .filter(Access.filterByFeature(AppFeatureId.kobo_database))
      //   .find(_ => _.params?.koboFormId === KoboIndex.byName('bn_re').id)
      // return u?.admin || accesses && !!accesses.find(_ => _.featureId === AppFeatureId.mpca)
    }
  },
  activity_info: {
    materialIcons: 'group_work',
    id: AppFeatureId.activity_info,
    name: 'Activity Info',
    color: '#00e6b8',
    path: '/activity-info',
    showIf: _ => true,
  },
  wfp_deduplication: {
    id: AppFeatureId.wfp_deduplication,
    name: 'WFP Deduplication',
    materialIcons: 'join_left',
    color: 'orange',
    path: '/wfp-deduplication',
    showIf: (u, accesses) => {
      return u?.admin || accesses && !!accesses.find(_ => _.featureId === AppFeatureId.wfp_deduplication)
    }
  },
  cfm: {
    id: AppFeatureId.cfm,
    name: 'CFM',
    materialIcons: 'support_agent',
    color: '#1c2c73',
    path: '/cfm',
    showIf: (u, accesses) => true
    // showIf: (u, accesses) => u?.admin || accesses && !!accesses.find(_ => _.featureId === AppFeatureId.cfm)
  },
  [AppFeatureId.partnership]: {
    id: AppFeatureId.partnership,
    name: 'Partnership',
    materialIcons: 'handshake',
    color: '#8ab4f8',
    path: '/partnership',
    showIf: (u, accesses) => true
    // showIf: (u, accesses) => u?.admin || accesses && !!accesses.find(_ => _.featureId === AppFeatureId.cfm)
  },
  snapshot: {
    id: AppFeatureId.snapshot,
    name: 'Snapshots',
    materialIcons: 'photo_camera',
    color: 'silver',
    path: '/snapshot',
    showIf: _ => _ && _?.admin
  },
  admin: {
    id: AppFeatureId.admin,
    name: 'Admin',
    materialIcons: 'admin_panel_settings',
    color: 'silver',
    path: '/admin',
    showIf: _ => _ && _?.admin
  },
  sandbox: {
    id: AppFeatureId.sandbox,
    color: 'black',
    materialIcons: 'api',
    name: 'Sandbox',
    path: '/sandbox',
    showIf: _ => _ && _?.email === appConfig.contact
  }
}

export const appFeatures = Enum.values(appFeaturesIndex)
