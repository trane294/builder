import React from 'react';
import { Form, Input, Card, Typography } from 'antd';
import ImageUploader from 'src/components/editor/ImageUploader';

const { Title, Text } = Typography;

interface WebsiteMetadataProps {
    metadata: {
        title: string;
        description: string;
        ogImage: string;
    };
    onChange: (metadata: any) => void;
}

const WebsiteMetadata: React.FC<WebsiteMetadataProps> = ({
    metadata,
    onChange,
}) => {
    const handleChange = (field: string, value: string) => {
        onChange({
            ...metadata,
            [field]: value,
        });
    };

    return (
        <Card className="metadata-editor" title="Website Metadata">
            <Form layout="vertical">
                <Form.Item
                    label="Website Title"
                    help="This will appear in browser tabs and search results"
                >
                    <Input
                        value={metadata.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Enter website title"
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    help="A brief description of your website (recommended: 150-160 characters)"
                >
                    <Input.TextArea
                        value={metadata.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                        placeholder="Enter website description"
                        rows={4}
                        showCount
                        maxLength={160}
                    />
                </Form.Item>

                <Form.Item
                    label="Social Image (Open Graph)"
                    help="This image appears when your site is shared on social media (recommended: 1200x630 pixels)"
                >
                    <ImageUploader
                        value={{ field: {}, value: metadata.ogImage }}
                        onChange={(url) => handleChange('ogImage', url)}
                    />
                </Form.Item>

                <div className="metadata-preview">
                    <Title level={5}>Preview</Title>
                    <Card size="small" className="social-preview">
                        {metadata.ogImage && (
                            <div className="preview-image">
                                <img
                                    src={metadata.ogImage}
                                    alt="Social preview"
                                    style={{ maxWidth: '100%' }}
                                />
                            </div>
                        )}
                        <div className="preview-content">
                            <Text strong>
                                {metadata.title || 'Your Website Title'}
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                {window.location.hostname}
                            </Text>
                            <Text style={{ fontSize: '14px' }}>
                                {metadata.description ||
                                    'Your website description will appear here'}
                            </Text>
                        </div>
                    </Card>
                </div>
            </Form>
        </Card>
    );
};

export default WebsiteMetadata;
