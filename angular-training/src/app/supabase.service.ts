import { Injectable, InjectionToken } from "@angular/core";
import{createClient,SupabaseClient} from "@supabase/supabase-js";

@Injectable({
    providedIn: 'root',
})

export class SupabaseService{
    private supabase= 'https://euxehdsktfqiwhwxbvvd.supabase.co';
    private supabaseKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGVoZHNrdGZxaXdod3hidnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NDI5NTgsImV4cCI6MjA2MDQxODk1OH0.TwS2T7WA-UmWJvSE1BzsJIxBf7NWXq--T1faWyitsMY';
    private client:SupabaseClient;

    constructor(){
        this.client=createClient(this.supabase,this.supabaseKey);
    }

    async getSubject():Promise<string[]>{
        const {data,error}=await this.client.from('genres').select('name');
        if(error){
            console.error('Error fetching subjects:', error);
            return [];
        }
        console.log('📦 Supabase取得結果:', data);
        return data.map((item)=>item.name);

    }

    async addSubject(name:string):Promise<void>{
        const {error}=await this.client.from('genres').insert({name});
        if(error){
            console.error('Error adding subject:', error);
        }
    }
            
}