import { Check, Palette } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F07316" },
    { name: "Teal", value: "#14B9A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  // KHRABI FIX: Click outside hone par dropdown band hona chahiye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all px-4 py-2 rounded-full"
      >
        {/* KHRABI FIX: Current color ka preview button mein dikhna chahiye */}
        <div 
            className="size-4 rounded-full border border-black/10 shadow-inner" 
            style={{ backgroundColor: selectedColor }}
        ></div>
        <span className="max-sm:hidden">Theme Color</span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-5 w-64 gap-3 absolute top-full right-0 md:left-0 p-4 mt-3 z-[100] bg-white rounded-2xl border border-slate-100 shadow-2xl animate-in fade-in zoom-in duration-200">
          {colors.map((color) => (
            <div
              key={color.value}
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div
                className={`size-10 rounded-full border-2 transition-all group-hover:scale-110 shadow-sm ${
                    selectedColor === color.value ? 'border-slate-800 ring-2 ring-slate-100' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                    <div className="flex items-center justify-center h-full">
                        <Check size={14} className={color.name === "White" ? "text-black" : "text-white"} />
                    </div>
                )}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tighter mt-1.5 text-slate-400 group-hover:text-slate-900 transition-colors">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;