import { supabase } from '../src/lib/supabase';

async function checkSchema() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error fetching schema:', error);
  } else {
    console.log('Product data sample:', data);
  }
}

checkSchema();
