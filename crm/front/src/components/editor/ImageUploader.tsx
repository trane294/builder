import React, { useState, useRef } from 'react';
import { Button, Input, Card, Spin, message } from 'antd';
import { UploadOutlined, LinkOutlined } from '@ant-design/icons';
import { useAppSelector } from 'src/hooks';

interface ImageUploaderProps {
    value?: {
        field: object;
        value: string;
    };
    onChange?: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
    const userToken = useAppSelector((state) => state.auth.userToken);
    const [imageUrl, setImageUrl] = useState<string>(value?.value || '');
    const [inputUrl, setInputUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            message.error('Please upload an image file');
            return;
        }

        try {
            setIsUploading(true);

            // Import the upload service
            const { uploadImage } = await import('./imageUploadService');

            if (!userToken) return;
            const result = await uploadImage(file, userToken);

            if (!result.success) {
                throw new Error(result.error || 'Upload failed');
            }

            setImageUrl(result.url);
            if (onChange) {
                onChange(result.url);
            }

            message.success('Image uploaded successfully');
        } catch (error) {
            message.error('Failed to upload image');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleUrlInput = async () => {
        if (!inputUrl) return;

        try {
            // Show loading state
            setIsUploading(true);

            // Import the validation service
            // const { validateImageUrl } = await import('./imageUploadService');

            // // Validate the URL
            // const isValid = await validateImageUrl(inputUrl);

            // if (!isValid) {
            //     message.error('Invalid image URL or image not accessible');
            //     return;
            // }

            setImageUrl(inputUrl);
            if (onChange) {
                onChange(inputUrl);
            }

            setInputUrl('');
            message.success('Image URL added');
        } catch (error) {
            message.error('Failed to validate image URL');
            console.error('URL validation error:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const renderImagePreview = () => {
        if (!imageUrl) return null;

        return (
            <div className="mt-4">
                <Card
                    style={{ width: '100%' }}
                    cover={
                        <img
                            alt="Uploaded image"
                            src={imageUrl}
                            style={{ maxHeight: '200px', objectFit: 'contain' }}
                        />
                    }
                >
                    <Input
                        value={imageUrl}
                        readOnly
                        addonAfter={
                            <Button
                                size="small"
                                onClick={() =>
                                    navigator.clipboard.writeText(imageUrl)
                                }
                            >
                                Copy
                            </Button>
                        }
                    />
                </Card>
            </div>
        );
    };

    return (
        <div className="w-full">
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />

            {/* Upload UI */}
            {!imageUrl && !isUploading && (
                <>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-2 text-center cursor-pointer"
                        onClick={triggerFileInput}
                    >
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            size="small"
                        >
                            Upload image
                        </Button>
                    </div>

                    <div className="text-center mb-2 text-sm">or</div>

                    <Input
                        placeholder="Enter image URL"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onPressEnter={handleUrlInput}
                        size="small"
                        suffix={
                            <Button
                                type="text"
                                icon={<LinkOutlined />}
                                onClick={handleUrlInput}
                                disabled={!inputUrl}
                            />
                        }
                    />
                </>
            )}

            {/* Loading state */}
            {isUploading && (
                <div className="border-2 border-gray-300 rounded-lg p-8 mb-4 text-center">
                    {/* <Spin tip="Uploading..." /> */}
                    <Spin />
                </div>
            )}

            {/* Preview of uploaded/linked image */}
            {renderImagePreview()}

            {/* Reset option when image is present */}
            {imageUrl && (
                <Button
                    className="mt-4"
                    danger
                    onClick={() => {
                        setImageUrl('');
                        if (onChange) {
                            onChange('');
                        }
                    }}
                >
                    Remove image
                </Button>
            )}
        </div>
    );
};

export default ImageUploader;
