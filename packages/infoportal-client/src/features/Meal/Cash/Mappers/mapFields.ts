import {Bn_pam, DrcOffice, DrcProject, KoboSubmissionFlat, Meal_cashPdm} from 'infoportal-common'

export class MapFields {
  private static donorKeys = new Set(Object.keys(Meal_cashPdm.options.donor))
  private static officeKeys = new Set(Object.keys(Meal_cashPdm.options.office))

  static donorIfExact(d: Bn_pam.Option<'donor'> | undefined): Meal_cashPdm.Option<'donor'> | undefined {
    if (!d) return undefined
    return this.donorKeys.has(d as string) ? (d as Meal_cashPdm.Option<'donor'>) : undefined
  }

  static projectFromExactDonor(d: Meal_cashPdm.Option<'donor'> | undefined): DrcProject | undefined {
    switch (d) {
      case 'ukr000270_pofu':
        return DrcProject['UKR-000270 Pooled Funds']
      case 'ukr000388_bha':
        return DrcProject['UKR-000388 BHA']
      case 'ukr000380_danida':
        return DrcProject['UKR-000380 DANIDA']
      default:
        return undefined
    }
  }

  static mapCashTypeBnToMeal(
    t: Bn_pam.Option<'did_receive_cash_yes'> | undefined,
  ): Meal_cashPdm.Option<'pdmtype'> | undefined {
    return t === 'empca' || t === 'bnmpca' ? t : undefined
  }

  static officeIfExact(o: Bn_pam.Option<'office'> | undefined): Meal_cashPdm.Option<'office'> | undefined {
    if (!o) return undefined
    return this.officeKeys.has(o as string) ? (o as Meal_cashPdm.Option<'office'>) : undefined
  }

  static projectOfficeIfExact(o: Bn_pam.Option<'office'> | undefined): DrcOffice | undefined {
    switch (o) {
      case 'dnipro':
        return DrcOffice.Dnipro
      case 'hrk':
        return DrcOffice.Kharkiv
      case 'chernihiv':
        return DrcOffice.Chernihiv
      case 'sumy':
        return DrcOffice.Sumy
      case 'mykolaiv':
        return DrcOffice.Mykolaiv
      case 'zaporizhzhya':
        return DrcOffice.Zaporizhzhya
      case 'slovyansk':
        return DrcOffice.Sloviansk
      default:
        return undefined
    }
  }

  static attachMeta<TSrc extends Record<string, any>, TDest extends Record<string, any>>(
    src: KoboSubmissionFlat<TSrc>,
    dest: TDest,
  ): KoboSubmissionFlat<TDest> {
    const {
      start,
      end,
      date,
      submissionTime,
      version,
      attachments, // было пропущено
      geolocation,
      id,
      uuid,
      validationStatus,
      validatedBy,
      submittedBy,
      lastValidatedTimestamp,
      source,
      updatedAt,
      tags,
    } = src

    return {
      ...dest,
      start,
      end,
      date,
      submissionTime,
      version,
      attachments,
      geolocation,
      id,
      uuid,
      validationStatus,
      validatedBy,
      submittedBy,
      lastValidatedTimestamp,
      source,
      updatedAt,
      tags,
    } as KoboSubmissionFlat<TDest>
  }
}
