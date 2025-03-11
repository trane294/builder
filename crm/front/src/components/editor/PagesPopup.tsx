import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Button, theme, Divider, Spin } from 'antd';
import {
    DownOutlined,
    HomeOutlined,
    FileOutlined,
    SearchOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { IWebsite } from 'src/types';
import DeleteConfirmation from 'src/components/helpers/DeleteConfirmation';
import { useUpdateWebsiteMutation } from 'src/services/website/websiteService';

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
    onDeletePage?: (path: string) => void;
}

const PagesDropdown: React.FC<PagesDropdownProps> = ({
    pages,
    currentPath,
    onPageSelect,
    onAddPage,
    onSearch,
    onDeletePage,
}) => {
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const handlePageClick = (path: string) => {
        if (onPageSelect) {
            onPageSelect(path);
        }
        setOpen(false);
    };

    const handleDeletePage = (path: string) => {
        if (onDeletePage) {
            onDeletePage(path);
        }
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
                            justifyContent: 'space-between',
                            backgroundColor: page.isActive
                                ? token.colorBgTextHover
                                : 'transparent',
                            transition: 'background-color 0.2s',
                        }}
                        onClick={() => handlePageClick(page.path)}
                        onMouseEnter={() => {
                            if (!page.isActive) {
                                setHoveredPath(page.path);
                            }
                        }}
                        onMouseLeave={() => {
                            if (!page.isActive) {
                                setHoveredPath(null);
                            }
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        <DeleteConfirmation
                            itemName="page"
                            title={`Delete page '${page.path}'`}
                            description={`Are you sure you want to delete the page "${page.path}"?`}
                            onDelete={() => handleDeletePage(page.path)}
                            placement="topRight"
                        >
                            <DeleteOutlined
                                style={{
                                    color: token.colorTextSecondary,
                                    opacity: hoveredPath === page.path ? 1 : 0,
                                    transition: 'opacity 0.2s',
                                }}
                                onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                            />
                        </DeleteConfirmation>
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
                {currentPath === '/' ? 'Home' : currentPath}
                <DownOutlined style={{ marginLeft: 8 }} />
            </Button>
        </Dropdown>
    );
};

interface IPagesDropdownComponent {
    website?: IWebsite;
    currentPath: string;
    onPageSelect: (path: string) => void;
    onAddPage: () => void;
    onDeletePage: (path: string) => void;
}

const PagesDropdownComponent: React.FC<IPagesDropdownComponent> = ({
    website,
    currentPath,
    onPageSelect,
    onAddPage,
    onDeletePage,
}) => {
    const [pages, setPages] = useState<Page[]>([]);
    const [updateWebsite, { isLoading }] = useUpdateWebsiteMutation();

    useEffect(() => {
        if (!website) return;
        const _pages: Page[] = [];
        for (const path in website.data) {
            _pages.push({
                key: path,
                path: path === '/' ? 'Home' : path,
                isHome: path === '/',
                isActive: path === currentPath,
            });
        }
        setPages(_pages);
    }, [website, currentPath]);

    return (
        <Spin spinning={isLoading}>
            <PagesDropdown
                pages={pages}
                currentPath={currentPath}
                onPageSelect={onPageSelect}
                onAddPage={onAddPage}
                onDeletePage={onDeletePage}
                onSearch={(query) => console.log(`Search: ${query}`)}
            />
        </Spin>
    );
};

export default PagesDropdownComponent;
