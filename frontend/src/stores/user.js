import { writable } from 'svelte/store';

export const userStore = writable(localStorage.getItem('user'));