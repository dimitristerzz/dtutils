/**
 * Generates a random integer between min and max (inclusive)
 * @param min Minimum integer
 * @param max Maximum integer
 * @returns Random integer between min and max
 */
export function randomInt(min: number, max: number): number {
  if (min > max) [min, max] = [max, min]; // swap if min > max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}