// microCMS用の型定義
export interface MicroCmsPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categories?: MicroCmsCategory[];
  thumbnail?: MicroCmsThumbnail;
}

export interface MicroCmsCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCmsThumbnail {
  url: string;
  height: number;
  width: number;
}

export interface MicroCmsResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 既存のAPI用型定義（必要に応じて保持）
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categories: string[];
  thumbnailUrl?: string;
}

export interface PostsResponse {
  posts: Post[];
}

export interface PostResponse {
  post: Post;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}