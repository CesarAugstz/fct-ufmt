import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { Button } from '../ui/button'

interface ToolTipMadridProps {
  children: React.ReactNode
  content: string
  onClick?: () => void
}

export default function ToolTipMadrid({
  children,
  content,
  onClick,
}: ToolTipMadridProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary-foreground"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
