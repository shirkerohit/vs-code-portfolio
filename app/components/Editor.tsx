'use client'

import ReactMarkdown from 'react-markdown'
import { FileType } from '../data/files'

interface EditorProps {
  file: FileType | null
}

export default function Editor({ file }: EditorProps) {
  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <img src="/vscode-icon.svg" alt="VS Code" className="w-[200px] h-[200px] opacity-10 mb-8 mx-auto" />
          <h2 className="text-xl mb-4">Welcome to My Portfolio</h2>
          <p>Use Ctrl+P to quickly navigate between files</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b border-[var(--vscode-border)] px-4 py-2 text-sm bg-[#252526]">
        {file.path}
      </div>
      <div className="p-6">
        <ReactMarkdown className="prose prose-invert max-w-none">
          {file.content || ''}
        </ReactMarkdown>
      </div>
    </div>
  )
}

