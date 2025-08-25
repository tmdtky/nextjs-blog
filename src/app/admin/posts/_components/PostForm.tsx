import { Category } from '@/types/Category'
import React from 'react'
import { CategoriesSelect } from './CategoriesSelect'

interface Props {
	mode: 'new' | 'edit'
	title: string
	setTitle: (title: string) => void
	content: string
	setContent: (content: string) => void
	thumbnailUrl: string
	setThumbnailUrl: (thumbnailUrl: string) => void
	categories: Category[]
	setCategories: (categories: Category[]) => void
	onSubmit: (e: React.FormEvent) => void
	onDelete?: () => void
	isSubmitting?: boolean
}

export const PostForm: React.FC<Props> = ({
	mode,
	title,
	setTitle,
	content,
	setContent,
	thumbnailUrl,
	setThumbnailUrl,
	categories,
	setCategories,
	onSubmit,
	onDelete,
	isSubmitting = false,
}) => {
	return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
        />
      </div>
      <div>
        <label
          htmlFor="thumbnailUrl"
          className="block text-sm font-medium text-gray-700"
        >
          サムネイルURL
        </label>
        <input
          type="text"
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
        />
      </div>
      <div>
        <label
          htmlFor="thumbnailUrl"
          className="block text-sm font-medium text-gray-700"
        >
          カテゴリー
        </label>
        <CategoriesSelect
          selectedCategories={categories}
          setSelectedCategories={setCategories}
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {isSubmitting ? '送信中...' : (mode === 'new' ? '作成' : '更新')}
      </button>
      {mode === 'edit' && (
        <button
          type="button"
          disabled={isSubmitting}
          className={`py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ml-2 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
          onClick={onDelete}
        >
          削除
        </button>
      )}
    </form>
	)
}