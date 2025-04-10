import React from 'react'
import { Button } from './ui/button'
import { ChevronLeft } from 'lucide-react'

function ChevronLeftRoute() {
    return (
        <Button variant="ghost" className="hover:cursor-pointer flex items-center justify-center">
            <ChevronLeft style={{ height: '32px', width: '32px' }} className=" text-[#0B9FF0]" />
        </Button>
    )
}

export default ChevronLeftRoute