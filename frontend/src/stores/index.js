import { writable } from 'svelte/store';

export const username = writable(localStorage.getItem('username'));
export const usertype = writable(localStorage.getItem('usertype'));