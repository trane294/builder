import React from 'react';
import { Layout, Typography, Button, Space, Tooltip, Row, Col } from 'antd';
import {
    LeftOutlined,
    RightOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router';
import PagesDropdownComponent from 'src/components/editor/PagesPopup';

const { Header } = Layout;
const { Title } = Typography;

const headerStyles = {
    header: {
        background: 'var(--puck-color-white)',
        borderBottom: '1px solid var(--puck-color-grey-09)',
        color: 'var(--puck-color-black)',
        gridArea: 'header',
        maxWidth: '100vw',
    },
    headerInner: {
        alignItems: 'end',
        display: 'grid',
        gap: 'var(--puck-space-px)',
        gridTemplateAreas: '"left middle right"',
        gridTemplateColumns: '1fr auto 1fr',
        gridTemplateRows: 'auto',
        padding: 'var(--puck-space-px)',
    },
    headerTitle: {
        alignSelf: 'center',
    },
    headerTools: {
        display: 'flex',
        gap: '16px',
        justifyContent: 'flex-end',
    },
};

interface EditorHeaderProps {
    title?: string;
    isLeftSidebarCollapsed?: boolean;
    isRightSidebarCollapsed?: boolean;
    onLeftToggleSidebar?: () => void;
    onRightToggleSidebar?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onPagePreview?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    isSaving?: boolean;
    onSave?: () => void;
    onSettings?: () => void;
    pagesDropdown?: React.ReactNode;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
    title = 'Page',
    isLeftSidebarCollapsed = false,
    isRightSidebarCollapsed = false,
    onLeftToggleSidebar = () => {},
    onRightToggleSidebar = () => {},
    onUndo = () => {},
    onRedo = () => {},
    onPagePreview = () => {},
    canUndo = true,
    canRedo = true,
    isSaving = false,
    onSave = () => {},
    onSettings = () => {},
    pagesDropdown,
}) => {
    return (
        <div style={headerStyles.header}>
            <div style={headerStyles.headerInner}>
                <div>
                    <Space>
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={onLeftToggleSidebar}
                            style={{ fontSize: '16px' }}
                        />
                        <Button
                            type="text"
                            icon={<MenuFoldOutlined />}
                            onClick={onRightToggleSidebar}
                            style={{ fontSize: '16px' }}
                        />
                        {pagesDropdown}
                    </Space>
                </div>
                <div style={headerStyles.headerTitle}>
                    <Title
                        level={4}
                        style={{
                            margin: 0,
                        }}
                    >
                        {title}
                    </Title>
                </div>
                <div style={headerStyles.headerTools}>
                    <Space>
                        <Tooltip title="Undo">
                            <Button
                                type="text"
                                icon={<LeftOutlined />}
                                onClick={onUndo}
                                disabled={!canUndo}
                            />
                        </Tooltip>
                        <Tooltip title="Redo">
                            <Button
                                type="text"
                                icon={<RightOutlined />}
                                onClick={onRedo}
                                disabled={!canRedo}
                            />
                        </Tooltip>

                        <Link to="/">
                            <Button
                                type="default"
                                icon={<HomeOutlined />}
                                size={'middle'}
                            />
                        </Link>
                        <Button
                            type="primary"
                            size={'middle'}
                            loading={isSaving}
                            onClick={onSave}
                        >
                            Save
                        </Button>
                        <Button
                            type="default"
                            icon={<SettingOutlined />}
                            size={'middle'}
                            onClick={onSettings}
                        />
                        <Button
                            type="default"
                            icon={<LinkOutlined />}
                            size={'middle'}
                            onClick={onPagePreview}
                        />
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default EditorHeader;
