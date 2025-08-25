import React from 'react'

interface Props {
  mode: 'new' | 'edit'
  name: string
  setName: (title: string) => void
  onSubmit: (e: React.FormEvent) => void
  onDelete?: () => void
  isSubmitting?: boolean
}

export const CategoryForm: React.FC<Props> = ({
  mode,
  name,
  setName,
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
          カテゴリー名
        </label>
        <input
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          className="mt-1 block w-full rounded-md border border-gray-200 p-3"
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

export default CategoryForm