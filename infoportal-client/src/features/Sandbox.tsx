import React, { useEffect } from 'react';
import { fnSwitch, Seq, seq } from '@alexandreannic/ts-utils';
import { useMetaContext } from '@/features/Meta/MetaContext';
import { useShelterData } from '@/features/Shelter/useShelterData';
import { DrcProgram, Person } from '@infoportal-common';
import { collectXlsKoboIndividuals } from '@/features/Shelter/Dasbhoard/useShelterComputedData';
import { expect } from 'chai';

type Row = {
  id: string;
  persons: Person.Person[];
};

export const Sandbox = () => {
  const metaData = useMetaContext();
  const testData = useShelterData();

  useEffect(() => {
    metaData.fetcher.fetch({}, { activities: [DrcProgram.ShelterRepair] });
    testData.fetchAll();
  }, []);

  const compareDataArrays = (arr1: Seq<Row>, arr2: Seq<Row>): void => {
    const differingElements: { id: string; item1: Row; item2: Row }[] = [];

    const indexArr2 = arr2.groupByFirst(item => item.id);

    arr1.forEach((item1) => {
      const item2 = indexArr2[item1.id];
      if (item2) {
        try {
          expect(item1.persons).deep.equal(item2.persons);
        } catch (e) {
          differingElements.push({ id: item1.id, item1, item2 });
        }
      }
    });

    if (differingElements.length > 0) {
      console.log('Differing data based on persons:');
      differingElements.forEach(diff => {
        console.log(`ID: ${diff.id}`);
        console.log('Shelter Data:', diff.item1);
        console.log('Meta Data:', diff.item2);
      });
    } else {
      console.log('No differences found between the data arrays based on persons.');
    }
  };

  useEffect(() => {
    if (!(metaData.data?.data.length > 0) || !(testData.mappedData?.length > 0)) {
      console.log('Data not ready', {
        metaDataLength: metaData.data?.data.length,
        mappedDataLength: testData.mappedData?.length,
      });
      return;
    }

    console.log('metaData', metaData.data.data.length);
    console.log('shelter', testData.mappedData.length);

    const meta: Seq<Row> = seq(metaData.data.filteredData || []).map(t => ({
      id: t.id,
      persons: t.persons ?? [],
    }));

    const shelter: Seq<Row> = seq(testData.mappedData || [])
      .filter(t => t.nta?.id)
      .map(t => {
        const persons = collectXlsKoboIndividuals(seq([t])).map(row => {
          console.log('Processing row:', row);
          return {
            age: row.hh_char_hh_det_age,
            gender: fnSwitch(row.hh_char_hh_det_gender!, {
              male: Person.Gender.Male,
              female: Person.Gender.Female,
            }, () => undefined),
          };
        });

        const result: Row = {
          id: t.nta!.id,
          persons,
        };

        console.log('Mapped Shelter Entry:', result);
        return result;
      }).compact();

    console.log('Final Shelter Data:', shelter);

    compareDataArrays(shelter, meta);
    console.log('done');
  }, [metaData.data, testData.mappedData]);

  return <div />;
};
