import React from 'react'
import { getMessById } from '../models/DataMessageModel'
import { useParams } from 'react-router-dom'

export const MessageDetail = () => {
  const { id } = useParams() as any

  const _message = getMessById(id)
  return <div className="card">
    <header className="card-header">
      <h3>{_message.subject}</h3>
      <p>{_message.from}&#8702;{_message.to}</p>
      <p>{new Date(_message.date).toDateString()}</p>
    </header>
    <main className="card-body">
      {_message.body}
    </main>
  </div>
}