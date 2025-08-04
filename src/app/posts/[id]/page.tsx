"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/constants';
import { Post, PostResponse } from '@/types';

const Detail: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // データを模擬的にAPIから取得する処理をuseEffectで実行
  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      if (!id || typeof id !== 'string') {
        console.log('ID is missing or invalid:', id);
        return;
      }
      
      console.log('Fetching post with ID:', id);
      setLoading(true);
      try {
        const url = `${API_BASE_URL}/posts/${id}`;
        console.log('Request URL:', url);
        
        const res = await fetch(url);
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data: PostResponse = await res.json();
        console.log('Response data:', data);
        setPost(data.post);
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetcher();
  }, [id]);

  // 記事取得中は、読み込み中であることを表示
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">読み込み中...</div>;
  }

  // 記事が見つからなかった場合の表示
  if (!loading && !post) {
    return <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">記事が見つかりません</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex flex-col bg-white">
          {/* サムネイル画像 */}
          {post?.thumbnailUrl && (
            <div className="mb-6">
              <img src={post.thumbnailUrl} alt={post.title} className="w-full h-auto rounded-lg" />
            </div>
          )}
          
          <div className="px-4">
            {/* 記事情報（日付とカテゴリ） */}
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm text-gray-500">
                {post && new Date(post.createdAt).toLocaleDateString()}
              </div>
              {post?.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: string) => {
                    return (
                      <div key={category} className="text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded">
                        {category}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* 記事タイトル */}
            <h1 className="text-2xl font-bold mb-6 text-gray-900">{post?.title}</h1>
            
            {/* 記事本文 */}
            {post?.content && (
              <div
                className="text-base leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;