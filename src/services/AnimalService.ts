import { Animal } from '../types/Animal';
import { supabase } from './supabase';

export const AnimalService = {
  async getAll(table: string): Promise<Animal[]> {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data as Animal[];
  },

  async create(table: string, animal: Animal): Promise<void> {
    const { error } = await supabase.from(table).insert(animal);
    if (error) throw error;
  },

  async update(table: string, id: string, animal: Animal): Promise<void> {
    const { error } = await supabase.from(table).update(animal).eq('id', id);
    if (error) throw error;
  },

  async delete(table: string, id: string): Promise<void> {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};