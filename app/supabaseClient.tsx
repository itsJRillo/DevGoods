import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://iovmeejceocblildcubg.supabase.co" , "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvdm1lZWpjZW9jYmxpbGRjdWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzMTA3NTgsImV4cCI6MjAyNDg4Njc1OH0.6Dw4NQP62PxqIkb0Dm45LwGZNvqlIv-cxbFtBrAsT-g");

export default supabase;