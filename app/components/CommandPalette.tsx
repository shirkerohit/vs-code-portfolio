'use client'

import { useEffect, useState } from 'react'
import { FileType, getAllFiles } from '../data/files'
import { FileIcon, Search } from 'lucide-react'

interface CommandPaletteProps {
  files: FileType[]
  onFileSelect: (file: FileType) => void
  onClose: () => void
}

export default function CommandPalette({ files, onFileSelect, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [allFiles] = useState(() => getAllFiles(files))
  const [filteredFiles, setFilteredFiles] = useState(allFiles)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const filtered = allFiles.filter(file =>
      file.path.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredFiles(filtered)
    setSelectedIndex(0)
  }, [search, allFiles])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, filteredFiles.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredFiles[selectedIndex]) {
          onFileSelect(filteredFiles[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredFiles, selectedIndex, onFileSelect, onClose])

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="w-[600px] mx-auto mt-[20vh]">
        <div className="bg-[#252526] rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center p-3 border-b border-[#3c3c3c]">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              autoFocus
              placeholder="Type to search files..."
              className="flex-1 bg-transparent border-none outline-none text-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredFiles.map((file, index) => (
              <div
                key={file.path}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex ? 'bg-[#04395e]' : 'hover:bg-[#2a2d2e]'
                }`}
                onClick={() => onFileSelect(file)}
              >
                <div className="flex items-center">
                  <FileIcon className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-200">{file.path}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

