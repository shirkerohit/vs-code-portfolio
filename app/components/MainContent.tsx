export default function MainContent() {
  const shortcuts = [
    { label: 'Show All Commands', keys: ['Ctrl', 'Shift', 'P'] },
    { label: 'Go to File', keys: ['Ctrl', 'E'] },
    { label: 'Find in Files', keys: ['Ctrl', 'Shift', 'F'] },
    { label: 'Toggle Full Screen', keys: ['F11'] },
    { label: 'Show Settings', keys: ['Ctrl', ','] },
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
      <img src="/vscode-icon.svg" alt="VS Code" className="w-[200px] h-[200px] opacity-10 mb-8" />
      <div className="space-y-4">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.label} className="flex items-center justify-between gap-4">
            <span>{shortcut.label}</span>
            <div className="flex gap-1">
              {shortcut.keys.map((key, index) => (
                <span key={index} className="shortcut-key">{key}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

