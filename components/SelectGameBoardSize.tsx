import React from "react"
import { UseFormRegister } from "react-hook-form"

interface IFormValues {
  boardSize: number
}

const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label className="mb-1 text-sm font-medium block">{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="9">9 (рекомендуемое)</option>
      <option value="19">19</option>
    </select>
  </>
))

export default Select