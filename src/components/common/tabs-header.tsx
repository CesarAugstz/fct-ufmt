import { TextSearchField } from '../ui/form-fields/text-search-field'
import { TabsList, TabsTrigger } from '../ui/tabs'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
  onSearchTermChange: (term: string) => void
  tabs: string[]
  inputPlaceholder?: string
}

export default function TabsHeader({
  className,
  onSearchTermChange,
  tabs,
  inputPlaceholder = 'Buscar',
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearchTermChange(e.target.value)
  }

  return (
    <div
      className={twMerge(
        'mb-8 flex lg:flex-row gap-4 flex-col items-center',
        className,
      )}
    >
      <TextSearchField
        className="w-full max-w-84"
        placeholder={inputPlaceholder}
        value={searchTerm}
        onChange={onChange}
      />
      <TabsList className="h-full w-full flex flex-wrap md:flex-nowrap bg-muted/50 p-1">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}
