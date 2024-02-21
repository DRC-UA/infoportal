import {useAppSettings} from '../core/context/ConfigContext'
import React from 'react'
import {useSession} from '@/core/Session/SessionContext'

export const Playground = () => {
  const {session} = useSession()
  const {api} = useAppSettings()
  return (
    <iframe width="1000" height="900" src="http://localhost:5001/kobo-api/4820279f-6c3d-47ba-8afe-47f86b16ab5d/aF54Rx9hYxzNvETTS8W5vN/441921023/edit-url"/>
  )
}