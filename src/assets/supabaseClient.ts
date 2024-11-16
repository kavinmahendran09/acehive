import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jzgisslizhrhnovplcuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z2lzc2xpemhyaG5vdnBsY3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MTkxODQsImV4cCI6MjA0NjM5NTE4NH0.u8W08GTXiiVf0SnQ6MykkWXfUl8bz68TKG6bmbP6ov4';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

export const fetchResources = async (filters: any, resourceType: string) => {
  let query = supabase.from('resources').select('*');

  if (filters.year) query = query.eq('year', filters.year);
  if (filters.degree) query = query.eq('degree', filters.degree);
  if (filters.specialisation) query = query.eq('specialisation', filters.specialisation);
  if (filters.subject) query = query.eq('subject', filters.subject);
  if (filters.elective) query = query.eq('elective', filters.elective);
  if (resourceType) query = query.eq('resource_type', resourceType);

  console.log("Query being executed:", query); // Log the query to debug

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  console.log("Data fetched:", data); // Log the fetched data to check
  return data || [];
};
