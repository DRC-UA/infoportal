import {KoboFlattenRepeat} from './koboFlattenRepeat'

describe('getUpdatedAnswers', () => {
  it('should return updated answers when values are changed', () => {
    expect(KoboFlattenRepeat.run(getData(), ['children', 'grandchildren'])).toEqual([
      {
        grandchildren_name: 'Charles',
        id: '618190661',
        _parent_index: 0,
        _parent_table_name: 'children',
      },
      {
        grandchildren_name: '??',
        id: '618190661',
        _parent_index: 2,
        _parent_table_name: 'children',
      },
      {
        grandchildren_name: 'grandchildren_name111',
        id: '617150518',
        _parent_index: 3,
        _parent_table_name: 'children',
      },
      {
        grandchildren_name: 'grandchildren_name112',
        id: '617150518',
        _parent_index: 3,
        _parent_table_name: 'children',
      },
      {
        grandchildren_name: 'children_name211',
        id: '617150518',
        _parent_index: 4,
        _parent_table_name: 'children',
      },
      {
        grandchildren_name: 'children_name212',
        id: '617150518',
        _parent_index: 4,
        _parent_table_name: 'children',
      },
    ])
  })
})

function getData(): any[] {
  return [
    {
      start: '2024-11-04T10:53:53.959Z',
      end: '2024-11-07T05:48:16.000Z',
      date: '2024-11-07T05:48:16.000Z',
      version: 'vF2JPodPGCZCopmwJNjFbj',
      attachments: [],
      geolocation: null,
      submissionTime: '2024-11-07T05:48:16.000Z',
      id: '618190661',
      uuid: '01a137e3-96c5-44f0-aba4-1aa18f4b40f4',
      validationStatus: null,
      cousin: [
        {
          cousin_name: 'Gaetan',
        },
      ],
      children: [
        {
          children_name: 'Jerome',
          grandchildren: [
            {
              grandchildren_name: 'Charles',
            },
          ],
          grandchildren2: [
            {
              grandchildren2_name: 'Alex',
            },
          ],
        },
        {
          children_name: 'Fabrice',
        },
        {
          children_name: 'Etienne',
          grandchildren: [
            {
              grandchildren_name: '??',
            },
          ],
        },
      ],
      instanceID: 'uuid:01a137e3-96c5-44f0-aba4-1aa18f4b40f4',
      family_name: 'Annic',
      formId: 'apn6HTbCJgwzrrGAywJdp2',
      tags: null,
    },
    {
      start: '2024-11-04T10:51:58.597Z',
      end: '2024-11-04T08:53:54.000Z',
      date: '2024-11-04T08:53:54.000Z',
      version: 'vF2JPodPGCZCopmwJNjFbj',
      attachments: [],
      geolocation: null,
      submissionTime: '2024-11-04T08:53:54.000Z',
      id: '617150518',
      uuid: '55e1c39b-7596-4c42-9e90-c556bb86f001',
      validationStatus: null,
      cousin: [
        {
          cousin_name: 'cousin_name1',
        },
        {
          cousin_name: 'cousin_name2',
        },
      ],
      children: [
        {
          children_name: 'children_name11',
          grandchildren: [
            {
              grandchildren_name: 'grandchildren_name111',
            },
            {
              grandchildren_name: 'grandchildren_name112',
            },
          ],
          grandchildren2: [
            {
              grandchildren2_name: 'grandchildren_name121',
            },
            {
              grandchildren2_name: 'grandchildren2_name122',
            },
          ],
        },
        {
          children_name: 'children_name2',
          grandchildren: [
            {
              grandchildren_name: 'children_name211',
            },
            {
              grandchildren_name: 'children_name212',
            },
          ],
          grandchildren2: [
            {
              grandchildren2_name: 'children_name221',
            },
          ],
        },
      ],
      instanceID: 'uuid:55e1c39b-7596-4c42-9e90-c556bb86f001',
      family_name: 'family_name',
      formId: 'apn6HTbCJgwzrrGAywJdp2',
      tags: null,
    },
  ]
}
