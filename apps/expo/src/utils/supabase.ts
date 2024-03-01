import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eoibsftippnvzdselnts.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvaWJzZnRpcHBudnpkc2VsbnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxOTQ4MjEsImV4cCI6MjAyNDc3MDgyMX0.2aC_rHlm7Nlcq0A5rliKjvHeBipkUUCuJ-JJ9WcWLIE";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("supabaseUrl or supabaseAnonKey not found!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
