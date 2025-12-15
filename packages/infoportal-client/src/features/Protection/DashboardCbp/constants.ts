import {Cbp_pre_post} from 'infoportal-common'

const mandatoryTrainingTopicScoreMap: Map<
  Cbp_pre_post.Option<'topic'>,
  | 'cal_total_roles_responsibilities_cbs'
  | 'cal_total_hum_pri_pro_mai'
  | 'cal_total_protection_risks_analysis'
  | 'cal_total_safe_referrals'
  | 'cal_total_group_facilitation_skills'
  | 'cal_total_pseah'
  // | 'cal_total_advocacy',
  // | 'cal_total_leadership_self_organization',
  // | 'cal_total_pfa',
> = new Map([
  ['roles_responsibilities_cbs', 'cal_total_roles_responsibilities_cbs'],
  ['hum_pri_pro_main', 'cal_total_hum_pri_pro_mai'],
  ['protection_risks_analysis', 'cal_total_protection_risks_analysis'],
  ['group_facilitation_skills', 'cal_total_group_facilitation_skills'],
  ['safe_referrals', 'cal_total_safe_referrals'],
  ['pseah', 'cal_total_pseah'],
  // ['advocacy', 'cal_total_advocacy'],
  // ['leadership_self_organization', 'cal_total_leadership_self_organization'],
  // ['pfa', 'cal_total_pfa'],
])

export {mandatoryTrainingTopicScoreMap}
