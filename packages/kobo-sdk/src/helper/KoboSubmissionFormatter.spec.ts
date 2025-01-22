import {KoboSubmissionFormatter} from './KoboSubmissionFormatter'
import {Kobo} from '../Kobo'

describe('Formatter', function () {
  it('removeGroup', function () {
    expect(
      KoboSubmissionFormatter.removeGroup({
        'formhub/uuid': '399c8a914b694ca6acd45de92fa625fd',
        start: new Date('2025-01-11T07:39:29.205Z'),
        cal_office: 'mykovaiv',
        'consent_personal_data/consent': 'yes',
        'beneficiary_details/family_member': [
          {
            'beneficiary_details/family_member/gender': 'male',
            'beneficiary_details/family_member/age': '27',
          },
        ],
      }),
    ).toEqual({
      uuid: '399c8a914b694ca6acd45de92fa625fd',
      start: new Date('2025-01-11T07:39:29.205Z'),
      cal_office: 'mykovaiv',
      consent: 'yes',
      family_member: [
        {
          gender: 'male',
          age: '27',
        },
      ],
    })
  })

  it('formatDataForSubmission', function () {
    expect(
      KoboSubmissionFormatter.formatData({
        data: fixture.data.raw,
        questionIndex: fixture.questionIndex,
        action: 'create',
        skipNullForCreate: false,
      }),
    ).toEqual([
      {
        name: 'Gavin Belson',
        address: {
          street: 'Silicon Valley',
          family: [
            {
              job: 'imo mealo',
            },
            {
              job: 'mealo',
            },
          ],
          number: 16,
          country: {
            country_name: 'ua',
            code: 'UA',
          },
        },
      },
    ])
  })

  const fixture = (() => {
    const data = {
      raw: [
        {
          name: 'Gavin Belson',
          street: 'Silicon Valley',
          family: [
            {
              job: 'imo mealo',
            },
            {
              job: 'mealo',
            },
          ],
          number: '16',
          country_name: 'ua',
          code: 'UA',
        },
      ],
      withSection: [
        {
          name: 'Gavin Belson',
          'address/street': 'Silicon Valley',
          'address/family': [
            {
              'address/family/job': 'imo mealo',
            },
            {
              'address/family/job': 'mealo',
            },
          ],
          'address/number': '16',
          'address/country/country_name': 'ua',
          'address/country/code': 'UA',
        },
      ],
    }

    const dummyForm: Kobo.Form = {
      content: {
        survey: [
          {
            name: 'name',
            type: 'text',
            label: ['name'],
            $xpath: 'name',
            $autoname: 'name',
          },
          {
            name: 'address',
            type: 'begin_group',
            label: ['address'],
            $xpath: 'address',
            $autoname: 'address',
          },
          {
            name: 'street',
            type: 'text',
            label: ['street'],
            $xpath: 'address/street',
            $autoname: 'street',
          },
          {
            name: 'family',
            type: 'begin_repeat',
            label: ['family'],
            $xpath: 'address/family',
            $autoname: 'family',
          },
          {
            name: 'job',
            type: 'select_multiple',
            label: ['job'],
            $xpath: 'address/family/job',
            $autoname: 'job',
            select_from_list_name: 'job',
          },
          {
            type: 'end_repeat',
          },
          {
            name: 'number',
            type: 'integer',
            label: ['number'],
            $xpath: 'address/number',
            $autoname: 'number',
          },
          {
            name: 'country',
            type: 'begin_group',
            label: ['city'],
            $xpath: 'address/country',
            $autoname: 'country',
          },
          {
            name: 'country_name',
            type: 'select_one',
            label: ['name'],
            $xpath: 'address/country/country_name',
            $autoname: 'country_name',
            select_from_list_name: 'country',
          },
          {
            name: 'code',
            type: 'text',
            label: ['code'],
            $xpath: 'address/country/code',
            $autoname: 'code',
          },
          {
            type: 'end_group',
          },
          {
            type: 'end_group',
          },
        ],
      },
    } as any
    const questionIndex = KoboSubmissionFormatter.buildQuestionIndex(dummyForm)
    return {
      questionIndex,
      data,
      dummyForm,
    }
  })()
})
