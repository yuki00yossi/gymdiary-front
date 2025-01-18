import { useState } from 'react'

import { Input } from '@mui/material'
import { Button } from "@/components/ui/button"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export default function TrainerSignupForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [specialization, setSpecialization] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('送信されたデータ:', { email, name, specialization });
    alert('ご登録ありがとうございます！近日中にご連絡いたします。')
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <div className='mb-6 w-full'>
        <div>
            <label htmlFor="email" className="text-orange-950">メールアドレス</label>
        </div>
        <div>
            <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
        </div>
      </div>
      <div className='mb-6 w-full'>
        <div>
            <label htmlFor="name" className="text-orange-950">氏名</label>
        </div>
        <div>
            <Input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
        </div>
      </div>
      <div className='mb-6 w-full'>
        <div>
            <label htmlFor="specialization" className="text-orange-950">専門分野</label>
        </div>
        <div>
            <Input
            id="specialization"
            type="text"
            required
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="例：ウェイトトレーニング、ヨガ、食事指導"
            className="w-full border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
        </div>
      </div>
      <div className='w-full mt-12'>
        <Button className='w-full'>登録</Button>
      </div>

    </form>
  )
}