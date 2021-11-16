import { writable } from 'svelte/store';
import supabase from './db.js';
export const user = writable(supabase.auth.currentUser);
export const subscription = writable(null);