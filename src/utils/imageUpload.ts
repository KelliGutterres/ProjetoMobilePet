import * as FileSystem from 'expo-file-system';
import mime from 'mime';
import { supabase } from '../services/supabase';

export async function uploadImageToSupabase(uri: string): Promise<string | undefined> {
  try {
    const fileExt = uri.split('.').pop();
    const fileName = `image-${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const fileType = mime.getType(uri) || 'image/jpeg';

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    const file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
//
    const response = await fetch(`https://lrcxnysihchyvvvnohjh.supabase.co/storage/v1/object/animals/${filePath}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': fileType,
        'Content-Encoding': 'base64',
      },
      body: file,
    });

    if (!response.ok) {
      console.log('Erro no upload', await response.text());
      return;
    }

    const { data } = supabase.storage.from('animals').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (e) {
    console.error('Erro ao enviar imagem:', e);
  }
}