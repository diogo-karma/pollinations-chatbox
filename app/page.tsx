'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import Header from '@/components/Header'
import ChatArea from '@/components/ChatArea'
import InputArea from '@/components/InputArea'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { v4 as uuidv4 } from 'uuid'

export default function KarmaPollinations() {
  const [messages, setMessages] = useState([])
  const [textModels, setTextModels] = useState([])
  const [imageModels, setImageModels] = useState([])
  const { setTheme } = useTheme()
  const chatAreaRef = useRef(null)
  const [showCookieConsent, setShowCookieConsent] = useState(true)

  useEffect(() => {
    setTheme('dark')
    fetchModels()
    loadMessagesFromLocalStorage()
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted') {
      setShowCookieConsent(false)
    }
  }, [setTheme])

  useEffect(() => {
    fetchModels()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchModels = async () => {
    try {
      const textResponse = await fetch('https://text.pollinations.ai/models')
      const textData = await textResponse.json()
      setTextModels(textData.map(model => ({ ...model, id: `text-${model.name}` })))

      const imageResponse = await fetch('https://image.pollinations.ai/models')
      const imageData = await imageResponse.json()
      setImageModels(imageData.map((model, index) => ({ id: `image-${model}-${index}`, name: model, description: model })))
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const handleSendMessage = async (message, type, model, file) => {
    const newMessage = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type,
      model,
    }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    saveMessagesToLocalStorage(updatedMessages)

    try {
      const formData = new FormData()
      formData.append('message', message)
      formData.append('type', type)
      formData.append('model', JSON.stringify(model))
      if (file) {
        formData.append('image', file)
      }

      const response = await fetch('/api/messages', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process message')
      }

      const data = await response.json()

      const assistantMessage = {
        id: uuidv4(),
        content: data.content,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        type: data.type,
        model: data.model,
      }

      if (data.imageUrl) {
        assistantMessage.imageUrl = data.imageUrl
        assistantMessage.imageText = data.imageText
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      saveMessagesToLocalStorage(finalMessages)
    } catch (error) {
      console.error('Error processing message:', error)
    }
  }

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  const handleReset = () => {
    localStorage.removeItem('chatMessages')
    setMessages([])
  }

  const loadMessagesFromLocalStorage = () => {
    const storedMessages = localStorage.getItem('chatMessages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }
  }

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }

  const handleAcceptCookies = () => {
    setShowCookieConsent(false)
    localStorage.setItem('cookieConsent', 'accepted')
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <Header onReset={handleReset} className="fixed top-0 w-full z-10 shadow-md bg-primary text-white" />

      {/* Main Content with Scrollable Center */}
      <div className="flex-1 overflow-y-auto pt-16 pb-16">
        <ChatArea messages={messages} chatAreaRef={chatAreaRef} />
      </div>

      {/* Fixed Footer */}
      <InputArea
        onSendMessage={handleSendMessage}
        textModels={textModels}
        imageModels={imageModels}
        className="fixed bottom-0 w-full z-10 shadow-md bg-secondary text-white"
      />
    </div>
  )
}
