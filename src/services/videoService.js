import { createClient } from "@supabase/supabase-js"
const PROJECT_URL = 'https://ljupbwgkwsbwksmyunih.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXBid2drd3Nid2tzbXl1bmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzI2MzAsImV4cCI6MTk4Mzk0ODYzMH0.Rr8pXYEdtB2eHwiy_QVtrd6XkNJyADaNVs1Nu_rGtwQ'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        GetAllVideos() {
            return supabase.from('video').select('*')
        }
    }
}