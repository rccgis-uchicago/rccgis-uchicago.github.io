// Image utility functions

/**
 * Get the path to a local image in the content/images directory
 * @param filename The filename of the image
 * @returns The path to the image
 */
export function getImagePath(filename: string): string {
  // Use Astro's base path for GitHub Pages compatibility
  const base = typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/';
  return `${base}images/${filename}`;
}

/**
 * Get the URL for an image, preferring local images when available
 * @param filename The filename of the image
 * @param fallbackUrl A fallback URL if the local image doesn't exist
 * @returns The URL to the image
 */
export function getImageUrl(filename: string, fallbackUrl?: string): string {
  // In a real implementation, you might want to check if the file exists
  // For now, we'll just return the local path if filename is provided
  if (filename) {
    return getImagePath(filename);
  }
  
  return fallbackUrl || '';
}