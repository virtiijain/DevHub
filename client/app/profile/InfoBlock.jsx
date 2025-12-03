"use client";
import { useState, useEffect } from "react";

export default function InfoBlock({ label, value, textarea, onSave }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      {editing ? (
        <div className="bg-white/10 border border-white/20 rounded-xl p-4">
          {textarea ? (
            <textarea
              className="w-full bg-transparent outline-none resize-none text-gray-100"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          ) : (
            <input
              className="w-full bg-transparent outline-none text-gray-100"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          )}
          <button
            className="mt-2 text-sm px-3 py-1 bg-white/20 rounded-lg"
            onClick={() => {
              onSave(val);
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div
          className="bg-white/10 border border-white/20 rounded-xl p-4 cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {textarea ? (
            <p className="text-gray-200 leading-relaxed">
              {val || "Add bio..."}
            </p>
          ) : (
            <p className="text-gray-100 font-medium">{val || "Tap to edit"}</p>
          )}
        </div>
      )}
    </div>
  );
}
