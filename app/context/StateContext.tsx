"use client"
import React, { createContext, useState} from "react"

interface Note {
 title: string,
 content: string,
 completed: boolean,
}

interface AppContextType {
  title: string,
  content: string,
  completed: boolean,
  card: Note[],
  setCard: React.Dispatch<React.SetStateAction<Note[]>>;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setCompleted: (value: boolean) => void
}

export const StateContext = createContext<AppContextType>({
    title: "",
    setTitle: () => {},
    content: "",
    setContent: () => {},
    completed: false,
    setCompleted: () => {},
    card: [],
    setCard: () => {}
    });

export function StateContextProvider({children}: {children: React.ReactNode})
 {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState(false);
  const [card, setCard] = useState<Note[]>([]);

  return (
    <StateContext.Provider value={{title, setTitle, content, setContent, completed, setCompleted, card, setCard}}>
       {children}
    </StateContext.Provider>
  )
}

