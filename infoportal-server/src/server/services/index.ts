import {ServiceStats} from './ServiceStats'
import {MpcaPaymentService} from '../../feature/mpca/mpcaPayment/MpcaPaymentService'

export interface Services {
  // ecrec: ServiceEcrec
  // legalAid: ServiceLegalAid
  stats: ServiceStats
  mpcaPayment: MpcaPaymentService

}
