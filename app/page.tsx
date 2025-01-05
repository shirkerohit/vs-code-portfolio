'use client'

import { useEffect, useState } from 'react'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import StatusBar from './components/StatusBar'
import CommandPalette from './components/CommandPalette'
import { files, FileType, findFile } from './data/files'

export default function Home() {
  const [activeFile, setActiveFile] = useState<FileType | null>(null)
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleFileSelect = (file: FileType) => {
    setActiveFile(file)
    setShowCommandPalette(false)
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar files={files} onFileClick={handleFileSelect} />
        <Editor file={activeFile} />
      </div>
      <StatusBar />
      {showCommandPalette && (
        <CommandPalette
          files={files}
          onFileSelect={handleFileSelect}
          onClose={() => setShowCommandPalette(false)}
        />
      )}
    </div>
  )
}

