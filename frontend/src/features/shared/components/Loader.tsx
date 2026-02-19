import React from 'react'

export const Loader: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 animate-loading-bar shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
