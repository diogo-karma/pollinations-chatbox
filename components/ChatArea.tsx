'use client'

import { useState, useEffect, useRef } from 'react'
import { Copy, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ReactMarkdown from 'react-markdown' // For rendering markdown content
import remarkGfm from 'remark-gfm' // To support GitHub-flavored markdown (e.g., tables, strikethrough, etc.)

export default function ChatArea({ messages, chatAreaRef }) {
  const [copiedId, setCopiedId] = useState(null) // State to track the copied message
  const bottomRef = useRef(null) // Ref for auto-scroll to bottom

  // Function to copy message content to the clipboard
  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000) // Reset copied state after 2 seconds
  }

  // Automatically scroll to the bottom whenever new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div
      ref={chatAreaRef}
      className="flex-1 overflow-y-auto overflow-x-auto p-4 space-y-4" // Allows both horizontal and vertical scrolling
      style={{ scrollBehavior: 'smooth' }} // Smooth scrolling for better UX
    >
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex items-start space-x-2 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar for user or bot */}
            <Avatar className="w-14 h-14">
              {message.sender === 'user' ? (
                <AvatarImage src="/yy.png" alt="User" />
              ) : (
                <AvatarImage src="/kk.png" alt="Karma Bot" />
              )}
              <AvatarFallback>{message.sender === 'user' ? <User /> : 'K'}</AvatarFallback>
            </Avatar>

            {/* Message container */}
            <div
              className={`p-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold">{message.sender === 'user' ? 'You' : 'Karma'}</span>
                {/* Copy Button */}

                {/* Copy confirmation */}
                {copiedId === message.id ? (
                  <span className="text-xs text-green-500 mt-1">Copied ✅</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(message.imageUrl ?? message.content, message.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>)}
              </div>


              {/* Image rendering with link */}
              {message.imageUrl && (
                <div className="mt-2">
                  <a
                    href={message.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={message.content || 'Generated image'}
                  >
                    <img
                      src={message.imageUrl}
                      alt="Generated or uploaded image"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </a>
                  {message.imageText && (
                    <p className="mt-1 text-sm text-muted-foreground">{message.imageText}</p>
                  )}
                </div>
              )}

              {/* Markdown rendering for message content */}
              {message.content && (
                <div className="mt-2 prose prose-sm text-muted-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Metadata (model and timestamp) */}
              <div className="mt-2 text-xs text-muted-foreground">
                <p>model: {message.model?.description || 'N/A'} [{new Date(message.timestamp).toLocaleString()}] - {message.seed}</p>
              </div>


            </div>
          </div>
        </motion.div>
      ))}
      {/* Ref for auto-scroll to bottom */}
      <div ref={bottomRef} />
    </div>
  )
}
