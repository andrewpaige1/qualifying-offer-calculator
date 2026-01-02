'use server'

import { revalidatePath } from 'next/cache';

async function getPlayerData(slug: string) {
  const apiUrl = process.env.NODE_ENV === 'production' 
    ? 'https://qualifying-offer-calculator-production.up.railway.app'
    : 'http://localhost:8000';
  const response = await fetch(`${apiUrl}/salaries/refresh-${slug}?player_amount=125`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json()
  return data;
}

export async function refreshPlayerData(slug: string) {
  revalidatePath('/');
  // clear cache to ensure data is not stale
  return getPlayerData(slug);
}
