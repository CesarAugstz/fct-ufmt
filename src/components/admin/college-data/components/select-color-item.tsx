import { SelectItem } from '@/components/ui/select'

export const mapColors = {
  indigo: 'bg-indigo-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  gray: 'bg-gray-500',
}

export function SelectColorItem({ color }: { color: string }) {
  const colorClassName = mapColors[color as keyof typeof mapColors]
  return (
    <SelectItem key={color} value={color}>
      <div className="flex items-center">
        <div
          className={`h-4 w-4 rounded-full mr-2 border border-slate-200 ${colorClassName}`}
        />
        {color}
      </div>
    </SelectItem>
  )
}
