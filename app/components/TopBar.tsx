export default function TopBar() {
  const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']
  
  return (
    <div className="vscode-titlebar h-[30px] flex items-center text-sm">
      <div className="flex items-center px-2">
        <img src="/vscode-icon.svg" alt="VS Code" className="w-4 h-4 mr-2" />
        {menuItems.map((item) => (
          <button key={item} className="px-3 py-1 hover:bg-white/10">
            {item}
          </button>
        ))}
      </div>
      <div className="flex-1 flex justify-center items-center text-xs text-gray-400">
        dockertest [WSL: Ubuntu-20.04]
      </div>
      <div className="window-controls flex">
        <button className="minimize">─</button>
        <button className="maximize">□</button>
        <button className="close">×</button>
      </div>
    </div>
  )
}

