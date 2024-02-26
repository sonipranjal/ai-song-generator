import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eoibsftippnvzdselnts.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaWJzZnRpcHBudnpkc2VsbnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4Nzg5NTQsImV4cCI6MjAyNDQ1NDk1NH0.VeWmCFRFz9kmvlvBvkCK6lkrOYxOrFVfMo0WgV-qjdc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
