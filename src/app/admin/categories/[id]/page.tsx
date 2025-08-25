'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryForm } from '../_components/CategoryForm'

export default function Page() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id } = useParams()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    // フォームのデフォルトの動作をキャンセルします。
    e.preventDefault()

    setIsSubmitting(true)

    try {
      // カテゴリーを更新します。
      await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      alert('カテゴリーを更新しました。')
    } catch (error) {
      console.error('カテゴリー更新エラー:', error)
      alert('カテゴリーの更新に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePost = async () => {
    if (!confirm('カテゴリーを削除しますか？')) return

    setIsSubmitting(true)

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        alert('カテゴリーを削除しました。')
        router.push('/admin/categories')
        router.refresh() // ページをリフレッシュして最新データを取得
      } else {
        alert('削除に失敗しました。')
      }
    } catch (error) {
      console.error('カテゴリー削除エラー:', error)
      alert('カテゴリーの削除に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`)
      const { category } = await res.json()
      setName(category.name)
    }

    fetcher()
  }, [id])

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">カテゴリー編集</h1>
      </div>

      <CategoryForm
        mode="edit"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDeletePost}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
