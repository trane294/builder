// imageUploadService.ts
/**
 * Service to handle image uploads to your backend or cloud storage
 */

interface UploadResponse {
    url: string;
    success: boolean;
    error?: string;
}

/**
 * Upload an image to your server or cloud storage (e.g., S3, Cloudinary)
 */
export const uploadImage = async (
    file: File,
    token: string
): Promise<UploadResponse> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        formData.append('type', 'image');
        formData.append('folder', 'puck-editor');

        const response = await fetch('http://localhost:3000/api/file', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
        }

        const data = await response.json();

        return {
            url: data.url,
            success: true,
        };
    } catch (error) {
        console.error('Image upload error:', error);

        return {
            url: '',
            success: false,
            error:
                error instanceof Error ? error.message : 'Unknown upload error',
        };
    }
};

/**
 * Validate an image URL (optional but recommended)
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });

        return true;
        // return (
        //     response.ok &&
        //     response.headers.get('Content-Type')?.startsWith('image/')
        // );
    } catch (error) {
        return false;
    }
};
