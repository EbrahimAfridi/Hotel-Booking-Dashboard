
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://npunyyiewzxjsjyialju.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wdW55eWlld3p4anNqeWlhbGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NjkzNTUsImV4cCI6MjAyMjE0NTM1NX0.VC5x_fLgxUSNBxd6rq4e3jAy9eNE25df3ptDUGzhqdM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
