import { useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/types/supabase'
import type { Memory, Photo, Comment, Like } from '@/types/supabase'

export function useMemories() {
  const createMemory = useCallback(async (memory: Omit<Memory, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('memories')
      .insert(memory)
      .select()
      .single()
    
    if (error) throw error
    return data
  }, [])

  const getMemories = useCallback(async (isPublic?: boolean) => {
    let query = supabase
      .from('memories')
      .select(`
        *,
        profiles (username, avatar_url),
        photos (*),
        comments (
          *,
          profiles (username, avatar_url)
        ),
        likes (*)
      `)
      .order('created_at', { ascending: false })

    if (typeof isPublic === 'boolean') {
      query = query.eq('is_public', isPublic)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  }, [])

  const updateMemory = useCallback(async (id: string, updates: Partial<Omit<Memory, 'id' | 'user_id'>>) => {
    const { data, error } = await supabase
      .from('memories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const deleteMemory = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('memories')
      .delete()
      .eq('id', id)

    if (error) throw error
  }, [])

  return {
    createMemory,
    getMemories,
    updateMemory,
    deleteMemory
  }
}

export function usePhotos() {
  const uploadPhoto = useCallback(async (file: File, memoryId: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${memoryId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(filePath)

    const { data, error } = await supabase
      .from('photos')
      .insert({
        memory_id: memoryId,
        url: publicUrl,
        description: file.name
      })
      .select()
      .single()

    if (error) throw error
    return data
  }, [])

  const deletePhoto = useCallback(async (id: string, url: string) => {
    const path = url.split('/').pop()
    if (path) {
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([path])

      if (storageError) throw storageError
    }

    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', id)

    if (error) throw error
  }, [])

  return {
    uploadPhoto,
    deletePhoto
  }
}

export function useComments() {
  const createComment = useCallback(async (comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select(`
        *,
        profiles (username, avatar_url)
      `)
      .single()

    if (error) throw error
    return data
  }, [])

  const deleteComment = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) throw error
  }, [])

  return {
    createComment,
    deleteComment
  }
}

export function useLikes() {
  const toggleLike = useCallback(async (memoryId: string) => {
    const { data: existingLike, error: fetchError } = await supabase
      .from('likes')
      .select()
      .eq('memory_id', memoryId)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

    if (existingLike) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id)

      if (error) throw error
      return null
    } else {
      const { data, error } = await supabase
        .from('likes')
        .insert({ memory_id: memoryId })
        .select()
        .single()

      if (error) throw error
      return data
    }
  }, [])

  return {
    toggleLike
  }
}
