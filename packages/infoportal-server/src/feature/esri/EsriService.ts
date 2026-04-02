import {queryFeatures, type IQueryFeaturesOptions} from '@esri/arcgis-rest-feature-layer'
import {SearchQueryBuilder} from '@esri/arcgis-rest-portal'

import {EsriSdk} from '../../core/externalSdk/esri/EsriSdk'

export class EsriService extends EsriSdk {
  constructor() {
    super()
  }

  readonly listSurveyFeatureLayers = () => {
    return this.searchItems({
      q: new SearchQueryBuilder().toParam(),
      outFields: ['type'],
    })
  }

  readonly getFeatureLayer = async (options: IQueryFeaturesOptions) => await queryFeatures(options)
}
