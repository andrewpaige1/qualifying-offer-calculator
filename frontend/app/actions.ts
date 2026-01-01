'use server'

import { revalidatePath } from 'next/cache';

async function getPlayerData(slug: string) {
  const response = await fetch(`http://localhost:8000/salaries/refresh-${slug}?player_amount=125`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json()
  return data;
}

export async function refreshPlayerData(slug: string) {
  revalidatePath('/');
  return getPlayerData(slug);
}
