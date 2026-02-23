import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setLocalStorageFromObject(obj: Record<string, any>): void {
  Object.entries(obj).forEach(([key, value]) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting key "${key}" in localStorage`, error);
    }
  });
}