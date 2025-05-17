// Image configuration for Astro

export const imageConfig = {
  // Define quality settings for different image types
  quality: {
    default: 80, // Default quality setting
    jpg: 85,
    png: 90,
    webp: 85,
    avif: 80
  },
  
  // Define formats to generate
  formats: ['avif', 'webp', 'original'],
  
  // Define common image sizes for responsive images
  sizes: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
};