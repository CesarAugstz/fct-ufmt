import Image from "next/image"
import { Search, Facebook, Instagram, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#002347] to-[#003366] text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-3">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="Logo FCT"
                width={60}
                height={60}
                className="rounded"
              />
            </div>
          </div>
          <div className="text-lg font-bold">
            <div>FACULDADE DE</div>
            <div>CIÊNCIAS E TECNOLOGIA</div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5 relative">
          <div className="relative">
            <Input
              type="text"
              placeholder="O que você procura?"
              className="w-full py-2 px-4 pr-10 rounded-full text-black border-accent focus:ring-2 focus:ring-blue-300 transition-all"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full text-gray-400 hover:text-blue-500"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
          >
            <Youtube className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-blue-200 hover:bg-blue-900/20 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
