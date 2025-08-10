"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MicroCmsPost } from './_types/api';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;
        if (!apiKey) {
          throw new Error('APIキーが設定されていません');
        }

        const res = await fetch('https://sifemn58jy.microcms.io/api/v1/posts', {
          headers: {
            'X-MICROCMS-API-KEY': apiKey,
          },
        });

        if (!res.ok) {
          throw new Error(`API呼び出しエラー: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.contents || []);
      } catch (error) {
        console.error('エラー:', error);
        setError(error instanceof Error ? error.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, []);



  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            再読み込み
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ヘッダー */}
      <header className="bg-slate-800 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog</h1>
          <nav>
            <Link href="/contact" className="text-white hover:text-gray-300">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">ブログ記事一覧</h2>
        
        {posts.length === 0 ? (
          <div className="text-gray-600 text-center py-10">
            記事が見つかりませんでした
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post: MicroCmsPost) => {
              return (
                <article key={post.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <Link href={`/posts/${post.id}`} className="block">
                    <div className="p-6">
                      {/* サムネイル画像 */}
                      {post.thumbnail && (
                        <div className="mb-4">
                          <img 
                            src={post.thumbnail.url} 
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      {/* 記事情報 */}
                      <div className="flex justify-between items-start mb-3">
                        <time className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        
                        {/* カテゴリー */}
                        <div className="flex flex-wrap gap-2">
                          {post.categories && post.categories.map((category) => (
                            <span
                              key={category.id}
                              className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* タイトル */}
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      
                      {/* コンテンツプレビュー */}
                      <div
                        className="text-gray-700 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: post.content ? 
                            post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 
                            ''
                        }}
                      />
                      
                      {/* 続きを読むリンク */}
                      <div className="mt-4">
                        <span className="text-blue-600 text-sm font-medium">
                          続きを読む →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;