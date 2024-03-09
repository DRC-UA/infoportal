import {ActivityInfoBuildType} from '../feature/activityInfo/databaseInterface/ActivityInfoBuildType'


(async () => {
  await ActivityInfoBuildType.snfi()
  await ActivityInfoBuildType.generalProtection()
  await ActivityInfoBuildType.mpca()
  await ActivityInfoBuildType.wash()
})()
