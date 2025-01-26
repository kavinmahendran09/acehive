import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

export default supabase;

export const fetchResources = async (
  filters: any,
  resourceType: string,
  maxRetries = 3
) => {
  const buildQuery = () => {
    let query = supabase.from('resources').select('*');
    
    if (filters.year) query = query.eq('year', filters.year);
    if (filters.degree) query = query.eq('degree', filters.degree);
    if (filters.specialisation) query = query.eq('specialisation', filters.specialisation);
    if (filters.subject) query = query.eq('subject', filters.subject);
    if (filters.elective) query = query.eq('elective', filters.elective);
    if (resourceType) query = query.eq('resource_type', resourceType);
    
    return query;
  };

  const isNetworkError = (error: any) => {
    const networkErrorSignals = [
      'network',
      'connection',
      'timeout',
      'fetch',
      'lost',
      'offline'
    ];

    return networkErrorSignals.some(signal => 
      String(error?.message || '').toLowerCase().includes(signal)
    );
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Fetch attempt ${attempt}:`, { 
        filters, 
        resourceType,
        timestamp: new Date().toISOString()
      });

      const { data, error } = await buildQuery();

      if (error) {
        console.error(`Detailed error on attempt ${attempt}:`, {
          errorCode: error.code,
          errorMessage: error.message,
          errorDetails: error
        });

        if (error.code === 'PGRST116') {
          console.warn('No rows returned - this might be expected.');
          return [];
        }

        if (isNetworkError(error)) {
          if (attempt < maxRetries) {
            console.warn(`Network error on attempt ${attempt}. Retrying...`);
            await new Promise(resolve => 
              setTimeout(resolve, 1000 * attempt * Math.random())
            );
            continue;
          }
        }

        throw error;
      }

      console.log(`Successful fetch on attempt ${attempt}:`, {
        dataLength: data?.length || 0,
        firstItem: data?.[0]
      });

      return data || [];

    } catch (error) {
      console.error(`Fetch attempt ${attempt} failed:`, {
        error,
        errorType: typeof error,
        errorMessage: error instanceof Error ? error.message : String(error)
      });

      if (attempt === maxRetries) {
        console.error('Failed to fetch resources after multiple attempts', {
          filters,
          resourceType,
          error: error instanceof Error ? error.message : String(error)
        });

        return [];
      }

      await new Promise(resolve => 
        setTimeout(resolve, 1000 * attempt * Math.random())
      );
    }
  }

  return []; 
};