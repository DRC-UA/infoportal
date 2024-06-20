import { KoboId } from '@infoportal-common';

export const generateEntryLink = (formId: KoboId, answerId: string): string => {
  return `https://infoportal-ua.drc.ngo/cfm#/entry/${formId}/${answerId}`;
}