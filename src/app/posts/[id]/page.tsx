"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MicroCmsPost } from '../../_types/api';

const Detail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error('記事IDが見つかりません');
        }

        const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
        if (!apiKey) {
          throw new Error('APIキーが設定されていません');
        }

        console.log('記事取得中:', id);

        const res = await fetch(
          `https://sifemn58jy.microcms.io/api/v1/posts/${id}`,
          {
            headers: {
              'X-MICROCMS-API-KEY': apiKey,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`記事の取得に失敗しました: ${res.status}`);
        }

        const data = await res.json();
        console.log('取得したデータ:', data);
        setPost(data);
      } catch (error) {
        console.error('エラー:', error);
        setError(error instanceof Error ? error.message : '記事の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <header className="bg-slate-800 text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300">
              Blog
            </Link>
          </div>
        </header>
        <div className="flex justify-center items-center py-20">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <header className="bg-slate-800 text-white py-4">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/" className="text-2xl font-bold hover:text-gray-300">
              Blog
            </Link>
          </div>
        </header>
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="text-red-600 mb-4">
              {error || '記事が見つかりません'}
            </div>
            <Link 
              href="/" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <header className="bg-slate-800 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            Blog
          </Link>
          <nav>
            <Link href="/contact" className="text-white hover:text-gray-300">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <article className="bg-white">
          {/* パンくずリスト */}
          <nav className="mb-6">
            <Link href="/" className="text-blue-600 hover:underline">
              ホーム
            </Link>
            <span className="mx-2 text-gray-500">›</span>
            <span className="text-gray-700">記事詳細</span>
          </nav>

          {/* サムネイル画像 */}
          {post.thumbnail && (
            <div className="mb-8">
              <img 
                src={post.thumbnail.url} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {/* 記事メタ情報 */}
          <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
            <time className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            
            {/* カテゴリー */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category.id}
                    className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* 記事タイトル */}
          <h1 className="text-3xl font-bold mb-8 text-gray-900 leading-tight">
            {post.title}
          </h1>
          
          {/* 記事本文 */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* ナビゲーション */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              ← 記事一覧に戻る
            </Link>
          </div>
        </article>
      </main>

      {/* フッター */}
      <footer className="bg-gray-100 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Detail;