import React, { useState, useRef, useEffect } from 'react'

export const CustomDropdown = ({ value, onChange, options = [] }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Select an option and close dropdown
  const handleSelect = (val) => {
    setTimeout(() => {
      setOpen(false) // close after parent re-render
    }, 0)
    onChange({ target: { value: val } })
  }

  return (
    <div className="relative w-full" ref={ref}>
      {/* Selected value */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full
          bg-gray-900
          text-white
          border border-purple-600
          px-3 py-2
          rounded-xl
          flex justify-between items-center
          focus:outline-none focus:ring-2 focus:ring-purple-500
          transition
          cursor-pointer
        "
      >
        <span>{value}</span>
        <svg
          className={`w-4 h-4 text-purple-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Options list */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-gray-900 border border-purple-600 rounded-xl shadow-lg overflow-hidden">
          {options.map((opt, idx) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)} // ✅ use handleSelect here
              className={`
                w-full text-left px-3 py-2 text-white cursor-pointer hover:bg-purple-700 transition
                ${
                  idx !== options.length - 1 ? 'border-b border-purple-800' : ''
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
