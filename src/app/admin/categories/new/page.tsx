'use client'

import { useState } from 'react'
import { Post } from '@/types/Post'
import { useRouter } from 'next/navigation'
import { CategoryForm } from '../_components/CategoryForm'

export default function Page() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセルします。
    e.preventDefault()

    // カテゴリーを作成します。
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    // レスポンスから作成したカテゴリーのIDを取得します。
    const { id } = await res.json()

    // 作成したカテゴリーの詳細ページに遷移します。
    router.push(`/admin/categories/${id}`)

    alert('カテゴリーを作成しました。')
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">カテゴリー作成</h1>
      </div>

      <CategoryForm
        mode="new"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
