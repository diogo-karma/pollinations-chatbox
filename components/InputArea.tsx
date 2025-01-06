'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Footer from './Footer'

// Tipos para os modelos de texto e imagem
interface Model {
  id: string
  description: string
}

interface FileData {
  base64: string | ArrayBuffer | null
  type: string
  name: string
}

interface InputAreaProps {
  onSendMessage: (message: string, type: 'text' | 'image', model: Model | undefined, fileBase64: string | null) => void
  textModels: Model[]
  imageModels: Model[]
}

export default function InputArea({ onSendMessage, textModels, imageModels }: InputAreaProps) {
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<'text' | 'image'>('text')
  const [selectedModel, setSelectedModel] = useState<string>(textModels[0]?.id || '')
  const [file, setFile] = useState<FileData | null>(null)

  useEffect(() => {
    if (textModels.length > 0 && type === 'text') {
      setSelectedModel(textModels[0].id)
    } else if (imageModels.length > 0 && type === 'image') {
      setSelectedModel(imageModels[0].id)
    }
  }, [type, textModels, imageModels])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() || file) {
      const model = type === 'text'
        ? textModels.find(m => m.id === selectedModel)
        : imageModels.find(m => m.id === selectedModel)

      onSendMessage(message, type, model, file ? file.base64 : null)
      setMessage('')
      setFile(null)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Verifica o tamanho do arquivo (4MB)
      if (selectedFile.size > 4 * 1024 * 1024) {
        alert('File size exceeds 4MB limit.')
        return
      }

      // Cria o Base64 do arquivo com mimetype
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile({
          base64: reader.result,
          type: selectedFile.type,
          name: selectedFile.name,
        })
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleTypeChange = (newType: 'text' | 'image') => {
    setType(newType)
    setSelectedModel(newType === 'text' ? textModels[0]?.id : imageModels[0]?.id)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center space-x-2 mb-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow"
        />
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {(type === 'text' ? textModels : imageModels).map((model, i) => (
              <SelectItem key={`${type}-${model.id}-${i}`} value={model.id}>
                {model.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      <div className="flex items-center justify-between hidden">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Image
                  </label>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Attached images will influence text and model interpretation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {file && <span className="text-sm text-muted-foreground">{file.name}</span>}
        </div>
      </div>
      <Footer />
    </form>
  )
}
