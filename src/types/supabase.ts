export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Memory = {
  id: string
  user_id: string
  title: string
  content: string
  date_of_memory: string | null
  location: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export type Photo = {
  id: string
  memory_id: string
  user_id: string
  url: string
  description: string | null
  taken_at: string | null
  created_at: string
}

export type Comment = {
  id: string
  memory_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export type Like = {
  id: string
  memory_id: string
  user_id: string
  created_at: string
}

// Helper type para database
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      memories: {
        Row: Memory
        Insert: Omit<Memory, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Memory, 'id' | 'user_id'>>
      }
      photos: {
        Row: Photo
        Insert: Omit<Photo, 'id' | 'created_at'>
        Update: Partial<Omit<Photo, 'id' | 'user_id' | 'memory_id'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Comment, 'id' | 'user_id' | 'memory_id'>>
      }
      likes: {
        Row: Like
        Insert: Omit<Like, 'id' | 'created_at'>
        Update: never
      }
    }
  }
}
