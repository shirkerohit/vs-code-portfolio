export default function StatusBar() {
  return (
    <div className="h-[22px] bg-[#007acc] text-white text-xs flex items-center px-2">
      <div className="flex items-center space-x-2">
        <span>WSL: Ubuntu-20.04</span>
        <span>△ 0</span>
        <span>✗ 0</span>
      </div>
    </div>
  )
}

