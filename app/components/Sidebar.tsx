'use client'

import { ChevronDown, ChevronRight, FileIcon, Folder, Search, GitBranch, Play, Package } from 'lucide-react'
import { useState } from 'react'
import { FileType } from '../data/files'

interface FolderTreeProps {
  items: FileType[]
  onFileClick: (file: FileType) => void
  level?: number
}

function FolderTree({ items, onFileClick, level = 0 }: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    '/portfolio': true,
    '/app': true,
  })

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }))
  }

  return (
    <div className="select-none">
      {items.map((item) => (
        <div key={item.path} style={{ paddingLeft: `${level * 12}px` }}>
          {item.type === 'folder' ? (
            <div>
              <div
                className="flex items-center py-1 hover:bg-[#37373d] cursor-pointer text-sm"
                onClick={() => toggleFolder(item.path)}
              >
                {expandedFolders[item.path] ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                <Folder className="w-4 h-4 mr-2" />
                {item.name}
              </div>
              {expandedFolders[item.path] && item.children && (
                <FolderTree
                  items={item.children}
                  onFileClick={onFileClick}
                  level={level + 1}
                />
              )}
            </div>
          ) : (
            <div
              className="flex items-center py-1 hover:bg-[#37373d] cursor-pointer text-sm pl-5"
              onClick={() => onFileClick(item)}
            >
              <FileIcon className="w-4 h-4 mr-2" />
              {item.name}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface SidebarProps {
  files: FileType[]
  onFileClick: (file: FileType) => void
}

const sidebarIcons = [
  { icon: FileIcon, label: 'Explorer', active: true },
  { icon: Search, label: 'Search' },
  { icon: GitBranch, label: 'Source Control' },
  { icon: Play, label: 'Run and Debug' },
  { icon: Package, label: 'Extensions' },
]

export default function Sidebar({ files, onFileClick }: SidebarProps) {
  return (
    <div className="flex h-full">
      <div className="w-12 bg-[#333333] flex flex-col items-center py-2">
        {sidebarIcons.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className={`w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white ${
                item.active ? 'border-l-2 border-white text-white' : ''
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </button>
          )
        })}
      </div>
      <div className="w-60 vscode-sidebar border-r border-[var(--vscode-border)]">
        <div className="p-2 text-xs uppercase tracking-wider text-gray-400">
          Explorer
        </div>
        <FolderTree items={files} onFileClick={onFileClick} />
      </div>
    </div>
  )
}

