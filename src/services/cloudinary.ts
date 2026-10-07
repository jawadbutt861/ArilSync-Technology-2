export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
};

export const isCloudinaryConfigured = Boolean(
  cloudinaryConfig.cloudName &&
  cloudinaryConfig.cloudName !== 'arilsync-tech' &&
  cloudinaryConfig.uploadPreset &&
  cloudinaryConfig.uploadPreset !== 'arilsync_unsigned_preset'
);

// High-fidelity pre-curated asset library ready for immediate selection
export const CURATED_PROJECT_IMAGES = [
  {
    name: 'Fintech Trading Terminal',
    url: '/src/assets/images/project_fintech_platform_1790413528716.jpg',
    category: 'Web Development'
  },
  {
    name: 'CareSync Mobile Telehealth',
    url: '/src/assets/images/project_health_app_1790413545174.jpg',
    category: 'Mobile Apps'
  },
  {
    name: 'Orbit Autonomous Logistics AI',
    url: '/src/assets/images/project_ai_logistics_1790413559668.jpg',
    category: 'AI & Machine Learning'
  },
  {
    name: 'Software Studio & Architecture',
    url: '/src/assets/images/hero_software_studio_1790413507514.jpg',
    category: 'UI/UX & Design Systems'
  }
];

/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * If credentials are not configured or upload fails, falls back gracefully to a high-performance Data URL.
 */
export async function uploadToCloudinary(file: File): Promise<{ url: string; publicId?: string; isSimulated: boolean }> {
  if (isCloudinaryConfigured) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);

      const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
      }

      const data = await response.json();
      return {
        url: data.secure_url || data.url,
        publicId: data.public_id,
        isSimulated: false,
      };
    } catch (error) {
      console.warn('[Cloudinary] Direct upload failed, falling back to local data URL:', error);
    }
  }

  // Graceful fallback: convert to base64 Data URL for instant preview & persistence
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        url: reader.result as string,
        publicId: `local_${Date.now()}`,
        isSimulated: true,
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Applies Cloudinary transformations (auto format, quality, dimensions) if the URL is hosted on Cloudinary
 */
export function getOptimizedCloudinaryUrl(url: string, options: { width?: number; quality?: string } = {}): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  const { width = 1200, quality = 'auto' } = options;
  const transform = `f_auto,q_${quality},w_${width},c_limit`;
  return url.replace('/upload/', `/upload/${transform}/`);
}
