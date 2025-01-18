'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TrainingRecordForm() {
  const [exercise, setExercise] = useState('')
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      exercise,
      weight,
      reps,
      sets,
      notes
    }
    console.log(formData)
  }

  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">トレーニング記録</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="exercise" className="block text-sm font-medium text-gray-700 mb-1">
            トレーニング種目
          </label>
          <Select onValueChange={setExercise} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="種目を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ベンチプレス">ベンチプレス</SelectItem>
              <SelectItem value="スクワット">スクワット</SelectItem>
              <SelectItem value="デッドリフト">デッドリフト</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            重量 (kg)
          </label>
          <Input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 50"
            required
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
            回数
          </label>
          <Input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="例: 10"
            required
          />
        </div>
        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
            セット数
          </label>
          <Input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="例: 3"
            required
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            メモ
          </label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="今日のトレーニングについてメモを残してください"
            rows={3}
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          保存
        </Button>
      </form>
    </div>
  )
}

