import React from "react"
import { UseFormRegister } from "react-hook-form"

interface IFormValues {
  boardSize: number
  color?: string
}

const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string, isColor?: boolean } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label, isColor }, ref) => (
  <>
    <label className="mb-1 text-sm font-medium block">{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      {isColor ? 
      <>
        <option value="BLACK">Черные</option>
        <option value="WHITE">Белые</option>
      </>
        : 
      <>
        <option value="9">9 (рекомендуемое)</option>
        <option value="19">19</option>
      </>
      }
    </select>
  </>
))

export default Select