"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Checkbox } from "../ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

interface Note {
  id: string,
  title: string,
  content: string
}

export function Note() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cards, setCards] = useState<Note[]>([]);

  const handleAddCard = () => {
    const newCard = {
      id: JSON.stringify(Date.now()),
      title: title,
      content: content
    }
    setCards(prev => [...prev, newCard])
    setTitle("");
    setContent("");
  } 
  
  return (
    <div>
  <Popover>
     <PopoverTrigger>
       <Input type="text" placeholder="Add a note" />
    </PopoverTrigger>
     <PopoverContent>
      <div className="flex flex-col gap-3">

      <Input 
      value={title} 
      onChange={(e)=>{setTitle(e.target.value)}} type="text" 
      placeholder="Enter a title"/>
      
      <Input 
       value={content}
       onChange={(e)=>{setContent(e.target.value)}}
       type="text" 
       placeholder="Enter a content"/>
       </div>
      <Button onClick={handleAddCard}>Add Note</Button>
     </PopoverContent>

  </Popover>
   {cards.map((card)=>(
  <Card key={card.id} className={`w-[90vw] flex mx-auto flex-col`}>
      <CardHeader>
      <CardTitle>{card.title}</CardTitle>
      <Checkbox />
      </CardHeader>
  
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
               {card.content}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
     ))}
    </div>
  )
}
