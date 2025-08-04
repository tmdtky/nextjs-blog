"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from '@/constants';
import { Post, PostsResponse } from '@/types';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // APIでpostsを取得する処理
  useEffect(() => {
    const fetcher = async (): Promise<void> => {
      try {
        const res = await fetch(`${API_BASE_URL}/posts`);
        const data: PostsResponse = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('記事の取得に失敗しました:', error);
      }
    };

    fetcher();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <ul className="space-y-8">
          {/* 記事の一覧をmap処理で繰り返し表示します。*/}
          {posts.map((post: Post) => {
            return (
              <li key={post.id} className="list-none">
                <Link href={`/posts/${post.id}`} className="text-gray-800 no-underline hover:text-gray-600">
                  <div className="bg-white border border-gray-300 p-6 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map((category: string) => {
                            return (
                              <div
                                key={category}
                                className="text-xs text-blue-600 border border-blue-600 px-2 py-1 rounded"
                              >
                                {category}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">{post.title}</h2>
                      <div
                        className="text-base leading-relaxed line-clamp-2 overflow-hidden text-gray-700"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;