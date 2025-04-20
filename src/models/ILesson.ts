export interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'code' | 'other';
}

export interface CommentReply {
  user: string;
  text: string;
  createdAt: Date;
  likes: number;
}

export interface Comment {
  user: string;
  text: string;
  createdAt: Date;
  likes: number;
  replies: CommentReply[];
}

export interface Lesson {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  duration: number;
  course: string;
  professor: {
    _id: string;
    name: string;
    email: string;
  };
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  resources: Resource[];
  status: 'draft' | 'published' | 'archived';
  likes: number;
  comments: Comment[];
  completionRate: number;
  averageRating: number;
  totalRatings: number;
} 