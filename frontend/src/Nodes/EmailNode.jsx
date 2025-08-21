import { useState } from 'react'
import BaseNode from './BaseNode'

export const EmailNode = ({ id, data }) => {
  const [recipient, setRecipient] = useState(data.recipient || '')
  const [subject, setSubject] = useState(data.subject || '')

  const content = (
    <div className="space-y-2">
      <input
        type="email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="recipient@email.com"
        className="w-full bg-gray-900 text-white border border-purple-600 rounded px-2 py-1 text-sm"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Email subject"
        className="w-full bg-gray-900 text-white border border-purple-600 rounded px-2 py-1 text-sm"
      />
    </div>
  )

  return (
    <BaseNode
      id={id}
      title=" Email Sender"
      content={content}
      inputs={['message', 'attachments']}
      outputs={['sent', 'error']}
      height={160}
      data={{ recipient, subject }} // pass state to BaseNode
    />
  )
}
