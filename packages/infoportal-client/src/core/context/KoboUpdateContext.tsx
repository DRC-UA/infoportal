import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {KoboUpdateModal, KoboEditModalOption, KoboUpdateModalType} from '@/shared/koboEdit/KoboUpdateModal'
import {KoboUpdateAnswers, KoboUpdateTag, KoboUpdateValidation} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'
import {InferTypedAnswer, InferTypedTag, KoboFormNameMapped} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {KoboIndex, KoboSubmissionMetaData} from 'infoportal-common'
import {KeyOf} from '@axanc/ts-utils'
import {useIpToast} from '@/core/useToast'
import {Kobo} from 'kobo-sdk'

export namespace KoboUpdate {
  export namespace DialogParams {
    export type ById =
      | {
          target: 'answer'
          params: UpdateDialog.ById.Answer
        }
      | {
          target: 'validation'
          params: UpdateDialog.ById.Validation
        }
      | {
          target: 'tag'
          params: UpdateDialog.ById.Tag
        }

    export type ByName<T extends KoboFormNameMapped, TTarg extends 'tag' | 'answer'> = TTarg extends 'tag'
      ? {
          target: TTarg
          params: UpdateDialog.ByName.Tag<T, KeyOf<InferTypedTag<T>>>
        }
      : {
          target: TTarg
          params: UpdateDialog.ByName.Answer<T, KeyOf<InferTypedAnswer<T>>>
        }
  }

  namespace UpdateDialog {
    export namespace ByName {
      export type Tag<T extends KoboFormNameMapped, K extends KeyOf<InferTypedTag<T>>> = Omit<
        KoboUpdate.Update.ByName.Tag<T, K>,
        'value'
      > & {
        type: KoboUpdateModalType
        options?: KoboEditModalOption[] | string[]
        onSuccess?: (params: KoboUpdateAnswers<NonNullable<InferTypedAnswer<T>['tags']>>) => void
      }
      export type Answer<T extends KoboFormNameMapped, K extends KeyOf<InferTypedAnswer<T>>> = Omit<
        KoboUpdate.Update.ByName.Answer<T, K>,
        'answer'
      > & {
        onSuccess?: (params: KoboUpdateAnswers<NonNullable<InferTypedAnswer<T>['tags']>>) => void
      }
    }

    export namespace ById {
      export type Answer<T extends Record<string, any> = any> = Omit<KoboUpdateAnswers<T>, 'answer'> & {
        onSuccess?: (params: KoboUpdateAnswers<T>) => void
        questionIndexed?: string
        indexChain?: number[]
        pathChain?: string[]
        onSubmitOverride?: (value: any) => Promise<number>
      }
      export type Validation = Omit<KoboUpdateValidation, 'status'> & {
        onSuccess?: (params: KoboUpdateValidation) => void
      }
      export type Tag = Omit<KoboUpdate.Update.ById.Tag, 'value'> & {
        type: KoboUpdateModalType
        options?: KoboEditModalOption[] | string[]
        onSuccess?: (params: KoboUpdateTag) => void
      }
    }
  }

  export namespace Update {
    export namespace ById {
      export type Tag = {
        formId: Kobo.FormId
        answerIds: Kobo.SubmissionId[]
        tag: string
        value: any
      }
      export type Answer = KoboUpdateAnswers & {
        questionIndexed?: string
        indexChain?: number[]
        pathChain?: string[]
      }
      export type Validation = KoboUpdateValidation
    }
    export namespace ByName {
      export type Tag<T extends KoboFormNameMapped, K extends KeyOf<NonNullable<InferTypedAnswer<T>['tags']>>> = {
        formName: T
        answerIds: Kobo.SubmissionId[]
        tag: K
        value: NonNullable<InferTypedAnswer<T>['tags']>[K] | null // TODO ensure null is updating correctly in DB
      }
      export type Answer<T extends KoboFormNameMapped, K extends KeyOf<InferTypedAnswer<T>>> = {
        formName: T
        answerIds: Kobo.SubmissionId[]
        question: K
        answer: InferTypedAnswer<T>[K] | null
      }
    }
  }
}

export type RepeatPatch = {
  formId: Kobo.FormId
  answerId: Kobo.SubmissionId
  question: string
  questionIndexed?: string
  indexChain?: number[]
  pathChain?: string[]
  value: any
}

export interface KoboUpdateContext {
  asyncUpdateById: {
    tag: UseAsyncMultiple<(_: KoboUpdate.Update.ById.Tag) => Promise<void>>
    answer: UseAsyncMultiple<(_: KoboUpdate.Update.ById.Answer) => Promise<void>>
    validation: UseAsyncMultiple<(_: KoboUpdate.Update.ById.Validation) => Promise<void>>
  }
  asyncUpdateByName: {
    tag: UseAsyncMultiple<
      <T extends KoboFormNameMapped, K extends KeyOf<InferTypedTag<T>>>(
        _: KoboUpdate.Update.ByName.Tag<T, K>,
      ) => Promise<void>
    >
    answer: UseAsyncMultiple<
      <T extends KoboFormNameMapped, K extends KeyOf<InferTypedAnswer<T>>>(
        _: KoboUpdate.Update.ByName.Answer<T, K>,
      ) => Promise<void>
    >
  }
  asyncUpdateManyRepeatById: UseAsyncMultiple<(_: Array<KoboUpdate.Update.ById.Answer>) => Promise<void>>
  asyncDeleteById: UseAsyncMultiple<(_: Pick<KoboUpdateAnswers, 'formId' | 'answerIds'>) => Promise<void>>
  openById: Dispatch<SetStateAction<KoboUpdate.DialogParams.ById | null>>
  openByName: <T extends KoboFormNameMapped, TTarg extends 'tag' | 'answer'>(
    p: KoboUpdate.DialogParams.ByName<T, TTarg> | null,
  ) => void
  close: () => void
}

const Context = React.createContext({} as KoboUpdateContext)

export const useKoboUpdateContext = () => useContext<KoboUpdateContext>(Context)

export const KoboUpdateProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()
  const [openDialog, setOpenDialog] = useState<KoboUpdate.DialogParams.ById | null>(null)
  const ctxAnswers = useKoboAnswersContext()

  const normalizeAnswerIds = (ids: (string | number)[]) => ids.map((x) => String(x).replace(/([#-]\d+)$/, ''))

  const parseIndexedXPath = (q: string): {name: string; index?: number}[] => {
    const segs: {name: string; index?: number}[] = []
    const re = /([^/\[\]]+)(?:\[(\d+)\])?/g
    let m: RegExpExecArray | null
    while ((m = re.exec(q)) !== null) segs.push({name: m[1], index: m[2] ? Number(m[2]) - 1 : undefined})
    return segs
  }
  const stripIndexes = (q: string) => q.replace(/\[(\d+)\]/g, '')

  function setWithChains(
    rec: Record<string, any>,
    questionXPath: string,
    value: any,
    indexChain: number[],
    pathChain: string[],
  ) {
    if (!indexChain.length || indexChain.length !== pathChain.length) return false

    const leaf = questionXPath.split('/').pop()!
    const qName = stripIndexes(leaf)
    const leafPath = stripIndexes([...pathChain, leaf].join('/'))
    const isDate = leafPath.toLowerCase().includes('date')
    const norm = isDate && typeof value === 'string' ? new Date(value) : value

    const deepestArrayKey = pathChain.join('/')
    const arr = rec[deepestArrayKey]
    if (!Array.isArray(arr)) return false

    const idx = indexChain[indexChain.length - 1]!
    if (idx < 0 || idx >= arr.length) return false

    const itemOld = arr[idx] ?? {}
    const itemNew = {
      ...itemOld,
      [leafPath]: norm,
      [qName]: norm,
    }
    const arrNew = arr.slice()
    arrNew[idx] = itemNew
    rec[deepestArrayKey] = arrNew
    return true
  }

  function setByIndexedXPath(rec: Record<string, any>, indexedXPath: string, value: any) {
    const segs = parseIndexedXPath(indexedXPath)
    if (!segs.some((s) => s.index != null)) {
      const key = segs.map((s) => s.name).join('/')
      const qName = segs[segs.length - 1].name
      const isDate = key.toLowerCase().includes('date')
      const norm = isDate && typeof value === 'string' ? new Date(value) : value
      rec[key] = norm
      rec[qName] = norm
      return true
    }

    let pathSoFar: string[] = []
    for (let i = 0; i < segs.length; i++) {
      const s = segs[i]
      pathSoFar.push(s.name)
      if (s.index == null) continue

      const arrayKey = pathSoFar.join('/')
      const arr = rec[arrayKey]
      if (!Array.isArray(arr)) return false
      const idx0 = s.index
      if (idx0 < 0 || idx0 >= arr.length) return false

      const nextSegs = segs.slice(i + 1)
      const leafKey = stripIndexes([...pathSoFar, ...nextSegs.map((_) => _.name)].join('/'))
      const qName = nextSegs[nextSegs.length - 1]?.name ?? s.name
      const isDate = leafKey.toLowerCase().includes('date')
      const norm = isDate && typeof value === 'string' ? new Date(value) : value

      const itemOld = arr[idx0] ?? {}
      const itemNew = {...itemOld, [leafKey]: norm, [qName]: norm}
      const newArr = [...arr]
      newArr[idx0] = itemNew
      rec[arrayKey] = newArr
      return true
    }
    return false
  }

  const _optimisticBatchPatch = (patches: RepeatPatch[]) => {
    if (!patches.length) return
    const formId = patches[0].formId
    const current = ctxAnswers.byId(formId).get
    if (!current) return

    const byAnswer = new Map<string, RepeatPatch[]>()
    for (const p of patches) {
      const key = String(p.answerId).replace(/([#-]\d+)$/, '')
      const arr = byAnswer.get(key) ?? []
      arr.push(p)
      byAnswer.set(key, arr)
    }

    ctxAnswers.byId(formId).set({
      ...current,
      data: current.data.map((a) => {
        const ps = byAnswer.get(String(a.id))
        if (!ps) return a
        const copy = {...a}
        for (const p of ps) {
          const keyToPatch = p.questionIndexed ?? p.question
          if (!(p.indexChain && p.pathChain && setWithChains(copy, keyToPatch, p.value, p.indexChain, p.pathChain))) {
            if (!setByIndexedXPath(copy, keyToPatch, p.value)) {
              const isDate = keyToPatch.toLowerCase().includes('date')
              ;(copy as any)[keyToPatch] = isDate && typeof p.value === 'string' ? new Date(p.value) : p.value
            }
          }
        }
        return copy
      }),
    })
  }

  const _updateCacheById = ({
    formId,
    key,
    isTag,
    value,
    answerIds,
    indexChain,
    pathChain,
  }: {
    answerIds: Kobo.SubmissionId[]
    formId: string
    key: string
    isTag?: boolean
    value: any
    indexChain?: number[]
    pathChain?: string[]
    questionIndexed?: string
  }) => {
    const ids = new Set(normalizeAnswerIds(answerIds))
    const current = ctxAnswers.byId(formId).get
    if (!current) return

    ctxAnswers.byId(formId).set({
      ...current,
      data: current.data.map((a) => {
        if (!ids.has(String(a.id))) return a
        const copy = {...a}
        if (isTag) {
          if (!copy.tags) copy.tags = {}
          ;(copy.tags as any)[key] = value
        } else {
          if (!(indexChain && pathChain && setWithChains(copy, key, value, indexChain, pathChain))) {
            if (!setByIndexedXPath(copy, key, value)) {
              const isDate = key.toLowerCase().includes('date')
              copy[key] = isDate && typeof value === 'string' ? new Date(value) : value
            }
          }
        }
        return copy
      }),
    })
  }

  const _updateCacheByName = ({
    formName,
    key,
    isTag,
    value,
    answerIds,
  }: {
    answerIds: Kobo.SubmissionId[]
    formName: KoboFormNameMapped
    key: string
    isTag?: boolean
    value: any
  }) => {
    const idsIndex = new Set(answerIds)
    const currentAnswers = ctxAnswers.byName(formName).get
    if (!currentAnswers) return
    ctxAnswers.byName(formName).set({
      ...currentAnswers,
      data: currentAnswers.data.map((a: any) => {
        if (idsIndex.has(a.id)) {
          if (isTag) {
            if (!a.tags) a.tags = {}
            ;(a.tags as any)[key] = value
          } else a[key] = value
        }
        return {...a}
      }),
    })
  }
  const _updateManyRepeatById = async (payloads: Array<KoboUpdate.Update.ById.Answer>) => {
    const patches: RepeatPatch[] = payloads.map((p) => ({
      formId: p.formId,
      answerId: String(p.answerIds[0]),
      question: String(p.question),
      questionIndexed: p.questionIndexed,
      indexChain: p.indexChain,
      pathChain: p.pathChain,
      value: p.answer,
    }))
    _optimisticBatchPatch(patches)

    for (const p of payloads) {
      await _updateById({...p, answerIds: [String(p.answerIds[0])]}, { skipCache: true })
    }
  }

  const asyncUpdateManyRepeatById = useAsync(_updateManyRepeatById, {requestKey: () => 'many'})

  const _updateById = async (p: KoboUpdate.Update.ById.Answer, opts?: { skipCache?: boolean }) => {
    const questionToPatch = p.questionIndexed ?? (p.question as string)
    if (!opts?.skipCache) {
      _updateCacheById({
        formId: p.formId,
        key: questionToPatch,
        isTag: false,
        value: p.answer,
        answerIds: normalizeAnswerIds(p.answerIds),
        indexChain: p.indexChain,
        pathChain: p.pathChain,
      })
    }

    try {
      await api.kobo.answer.updateAnswers({
        answerIds: normalizeAnswerIds(p.answerIds),
        answer: p.answer,
        formId: p.formId,
        question: questionToPatch,
      })
    } catch (e) {
      toastHttpError(e)
      ctxAnswers.byId(p.formId).fetch({force: true, clean: false})
      return Promise.reject(e)
    }
  }

  const asyncUpdateAnswerById = useAsync(_updateById, {requestKey: ([_]) => _.formId})

  const asyncUpdateAnswerByName = useAsync(
    async <T extends KoboFormNameMapped, K extends KeyOf<InferTypedAnswer<T>>>(
      p: KoboUpdate.Update.ByName.Answer<T, K>,
    ) => {
      await api.kobo.answer
        .updateAnswers({
          answerIds: normalizeAnswerIds(p.answerIds),
          answer: p.answer,
          formId: KoboIndex.byName(p.formName).id,
          question: p.question,
        })
        .then(() => {
          _updateCacheByName({
            formName: p.formName,
            key: p.question,
            isTag: false,
            value: p.answer,
            answerIds: normalizeAnswerIds(p.answerIds),
          })
        })
        .catch((e) => {
          toastHttpError(e)
          ctxAnswers.byName(p.formName).fetch({force: true, clean: false})
          return Promise.reject(e)
        })
    },
    {requestKey: ([_]) => _.formName},
  )

  const asyncUpdateValidationById = useAsync(
    async (params: KoboUpdateValidation) => {
      await api.kobo.answer.updateValidation({
        ...params,
        answerIds: normalizeAnswerIds(params.answerIds),
      })
      const key: keyof KoboSubmissionMetaData = 'validationStatus'
      _updateCacheById({
        formId: params.formId,
        answerIds: normalizeAnswerIds(params.answerIds),
        key,
        value: params.status,
      })
    },
    {requestKey: ([_]) => _.formId},
  )

  const asyncUpdateTagByName = useAsync(
    async <T extends KoboFormNameMapped, K extends KeyOf<NonNullable<InferTypedAnswer<T>['tags']>>>(
      p: KoboUpdate.Update.ByName.Tag<T, K>,
    ) => {
      const formId = KoboIndex.byName(p.formName).id
      await api.kobo.answer
        .updateTag({
          answerIds: normalizeAnswerIds(p.answerIds),
          formId,
          tags: {[p.tag]: p.value},
        })
        .then(() => {
          _updateCacheByName({
            key: p.tag as string,
            isTag: true,
            answerIds: normalizeAnswerIds(p.answerIds),
            value: p.value,
            formName: p.formName,
          })
        })
        .catch((e) => {
          toastHttpError(e)
          ctxAnswers.byName(p.formName).fetch({force: true, clean: false})
          return Promise.reject(e)
        })
    },
    {requestKey: ([_]) => _.formName},
  )

  const asyncUpdateTagById = useAsync(
    async (p: KoboUpdate.Update.ById.Tag) => {
      await api.kobo.answer
        .updateTag({
          answerIds: normalizeAnswerIds(p.answerIds),
          formId: p.formId,
          tags: {[p.tag]: p.value},
        })
        .then(() => {
          _updateCacheById({
            formId: p.formId,
            key: p.tag,
            isTag: true,
            value: p.value,
            answerIds: normalizeAnswerIds(p.answerIds),
          })
        })
        .catch((e) => {
          toastHttpError(e)
          ctxAnswers.byId(p.formId).fetch({force: true, clean: false})
          return Promise.reject(e)
        })
    },
    {requestKey: ([_]) => _.formId},
  )

  const asyncDeleteById = useAsync(
    async ({answerIds, formId}: Pick<KoboUpdateAnswers, 'answerIds' | 'formId'>) => {
      await api.kobo.answer
        .delete({
          answerIds: normalizeAnswerIds(answerIds),
          formId,
        })
        .then(() => {
          const idsIndex = new Set(normalizeAnswerIds(answerIds))
          const currentAnswers = ctxAnswers.byId(formId).get
          if (!currentAnswers) return
          ctxAnswers.byId(formId).set({
            ...currentAnswers,
            data: currentAnswers.data.filter((a) => !idsIndex.has(String(a.id))),
          })
        })
        .catch((e) => {
          toastHttpError(e)
          ctxAnswers.byId(formId).fetch({force: true, clean: false})
          return Promise.reject(e)
        })
    },
    {requestKey: ([_]) => _.formId},
  )

  return (
    <Context.Provider
      value={{
        asyncDeleteById,
        asyncUpdateById: {
          tag: asyncUpdateTagById,
          answer: asyncUpdateAnswerById,
          validation: asyncUpdateValidationById,
        },
        asyncUpdateByName: {
          tag: asyncUpdateTagByName,
          answer: asyncUpdateAnswerByName,
        },
        asyncUpdateManyRepeatById,
        openById: setOpenDialog,
        openByName: <T extends KoboFormNameMapped, TTarg extends 'tag' | 'answer'>(
          p: KoboUpdate.DialogParams.ByName<T, TTarg> | null,
        ) => {
          setOpenDialog(
            p
              ? {
                  ...p,
                  params: {
                    formId: KoboIndex.byName(p.params.formName).id,
                    ...p.params,
                  } as any,
                }
              : null,
          )
        },
        close: () => setOpenDialog(null),
      }}
    >
      {children}
      {(() => {
        if (!openDialog) return <></>
        switch (openDialog.target) {
          case 'answer':
            return (
              <KoboUpdateModal.Answer
                formId={openDialog.params.formId}
                columnName={openDialog.params.question}
                answerIds={openDialog.params.answerIds}
                questionIndexed={(openDialog.params as any).questionIndexed}
                indexChain={(openDialog.params as any).indexChain}
                pathChain={(openDialog.params as any).pathChain}
                onSubmitOverride={(openDialog.params as any).onSubmitOverride}
                onClose={() => setOpenDialog(null)}
                onUpdated={openDialog.params.onSuccess}
              />
            )
          case 'tag':
            return (
              <KoboUpdateModal.Tag
                type={openDialog.params.type}
                formId={openDialog.params.formId}
                tag={openDialog.params.tag}
                options={openDialog.params.options}
                answerIds={openDialog.params.answerIds}
                onClose={() => setOpenDialog(null)}
                onUpdated={openDialog.params.onSuccess}
              />
            )
          case 'validation':
            return (
              <KoboUpdateModal.Validation
                formId={openDialog.params.formId}
                answerIds={openDialog.params.answerIds}
                onClose={() => setOpenDialog(null)}
                onUpdated={openDialog.params.onSuccess}
              />
            )
        }
      })()}
    </Context.Provider>
  )
}
