import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNumber(input: string | number) {
  input = input.toString();
  input = input.replace(/\D/g, '');
  input = Number(input);

  const validNumber = Number.isInteger(input);
  console.log(input, validNumber);

  return validNumber ? input : null;
}
