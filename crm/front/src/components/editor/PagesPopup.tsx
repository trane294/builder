import React, { useState } from 'react';
import { Dropdown, Input, Button, theme, Divider } from 'antd';
import {
    DownOutlined,
    HomeOutlined,
    FileOutlined,
    SearchOutlined,
} from '@ant-design/icons';

interface Page {
    key: string;
    path: string;
    isHome?: boolean;
    isActive?: boolean;
}

interface PagesDropdownProps {
    pages: Page[];
    currentPath: string;
    onPageSelect?: (path: string) => void;
    onAddPage?: () => void;
    onSearch?: (query: string) => void;
}

const PagesDropdown: React.FC<PagesDropdownProps> = ({
    pages,
    currentPath,
    onPageSelect,
    onAddPage,
    onSearch,
}) => {
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageClick = (path: string) => {
        if (onPageSelect) {
            onPageSelect(path);
        }
        setOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const dropdownContent = (
        <div
            style={{
                backgroundColor: token.colorBgElevated,
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowSecondary,
                width: 320,
                padding: '12px 0',
            }}
        >
            {/* Header */}
            <div style={{ padding: '0 16px 12px' }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>Pages</div>
            </div>

            <Divider style={{ margin: '0 0 12px 0' }} />

            {/* Search */}
            <div style={{ padding: '0 16px 12px' }}>
                <Input
                    size="middle"
                    prefix={
                        <SearchOutlined
                            style={{ color: token.colorTextQuaternary }}
                        />
                    }
                    placeholder="Search pages"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '100%' }}
                />
            </div>

            {/* Page list */}
            <div
                style={{ maxHeight: 240, overflowY: 'auto', padding: '0 8px' }}
            >
                {pages.map((page) => (
                    <div
                        key={page.key}
                        style={{
                            padding: '8px 8px',
                            margin: '0 0 4px 0',
                            borderRadius: token.borderRadiusSM,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: page.isActive
                                ? token.colorBgTextHover
                                : 'transparent',
                            transition: 'background-color 0.2s',
                        }}
                        onClick={() => handlePageClick(page.path)}
                        onMouseEnter={(e) => {
                            if (!page.isActive) {
                                e.currentTarget.style.backgroundColor =
                                    token.colorBgTextActive;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!page.isActive) {
                                e.currentTarget.style.backgroundColor =
                                    'transparent';
                            }
                        }}
                    >
                        {page.isHome ? (
                            <HomeOutlined
                                style={{
                                    marginRight: 8,
                                    color: token.colorTextSecondary,
                                }}
                            />
                        ) : (
                            <FileOutlined
                                style={{
                                    marginRight: 8,
                                    color: token.colorTextSecondary,
                                }}
                            />
                        )}
                        <span>{page.path}</span>
                    </div>
                ))}
            </div>

            {/* Add page button */}
            <div style={{ padding: '12px 16px 0' }}>
                <Button
                    type="primary"
                    block
                    style={{
                        backgroundColor: '#0e1c36',
                        borderColor: '#0e1c36',
                    }}
                    onClick={() => {
                        if (onAddPage) {
                            onAddPage();
                        }
                        setOpen(false);
                    }}
                >
                    Add page
                </Button>
            </div>
        </div>
    );

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            dropdownRender={() => dropdownContent}
            trigger={['click']}
        >
            <Button
                style={{
                    backgroundColor: '#0e1c36',
                    borderColor: '#0e1c36',
                    color: 'white',
                }}
            >
                {currentPath}
                <DownOutlined style={{ marginLeft: 8 }} />
            </Button>
        </Dropdown>
    );
};

// Example usage
const PagesDropdownExample: React.FC = () => {
    const samplePages: Page[] = [
        { key: 'home', path: 'Home', isHome: true },
        { key: 'sample', path: '/sample/2/3', isActive: true },
        { key: 'about', path: '/about' },
        { key: 'contact', path: '/contact' },
    ];

    return (
        <PagesDropdown
            pages={samplePages}
            currentPath="sample/2/3"
            onPageSelect={(path) => console.log(`Selected: ${path}`)}
            onAddPage={() => console.log('Add page clicked')}
            onSearch={(query) => console.log(`Search: ${query}`)}
        />
    );
};

export default PagesDropdownExample;
