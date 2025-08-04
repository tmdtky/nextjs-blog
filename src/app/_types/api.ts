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