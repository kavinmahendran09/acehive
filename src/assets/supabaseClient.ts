import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jzgisslizhrhnovplcuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z2lzc2xpemhyaG5vdnBsY3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MTkxODQsImV4cCI6MjA0NjM5NTE4NH0.u8W08GTXiiVf0SnQ6MykkWXfUl8bz68TKG6bmbP6ov4';

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

  // Helper function to check if it's a network-related error
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

        // Specific error handling
        if (error.code === 'PGRST116') {
          console.warn('No rows returned - this might be expected.');
          return [];
        }

        // Network-related errors
        if (isNetworkError(error)) {
          if (attempt < maxRetries) {
            console.warn(`Network error on attempt ${attempt}. Retrying...`);
            // Exponential backoff with jitter
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

      // Last attempt failed
      if (attempt === maxRetries) {
        console.error('Failed to fetch resources after multiple attempts', {
          filters,
          resourceType,
          error: error instanceof Error ? error.message : String(error)
        });

        return [];
      }

      // Wait before next retry with jitter for better distribution
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * attempt * Math.random())
      );
    }
  }

  return []; // Fallback return
};