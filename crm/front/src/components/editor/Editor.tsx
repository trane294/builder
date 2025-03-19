import 'src/components/editor/Editor.scss';
import { Puck, usePuck, Drawer as PuckDrawer } from '@measured/puck';
import { Button, Drawer, DrawerProps, Layout, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import cloneDeep from 'lodash.clonedeep';

const { Header, Content } = Layout;

interface ICustomDrawer {
    config: any;
    data: any;
}

const CustomDrawer: React.FC<ICustomDrawer> = ({ config, data }) => {
    const { getPermissions, dispatch } = usePuck();

    const handleClick = () => {
        const newContent = cloneDeep(data.content);
        newContent.push({
            type: 'HeroPhoto1',
            props: {
                id: 'HeroPhoto1-36075e2c-0f31-4fe2-9f42-9bc7dd4111ad',
                name: 'John',
                title: 'Demo Store',
            },
        });

        dispatch({
            type: 'setData',
            data: {
                content: newContent,
                root: data.root,
                zones: data.zones,
            },
        });
    };

    return (
        <PuckDrawer>
            <div>
                {Object.keys(config.components).map(
                    (componentKey, componentIndex) => {
                        const canInsert = getPermissions({
                            type: componentKey,
                        }).insert;

                        return (
                            <div key={componentKey} onClick={handleClick}>
                                {componentKey}
                            </div>
                        );
                    }
                )}
            </div>
        </PuckDrawer>
    );
};

interface IEditor {
    config: any;
    data: any;
    onPublish: () => Promise<void>;
}

const CustomEditor: React.FC<IEditor> = ({ config, data, onPublish }) => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] =
        useState<DrawerProps['placement']>('left');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onChange = (e: RadioChangeEvent) => {
        setPlacement(e.target.value);
    };

    return (
        <>
            <Puck
                config={config}
                data={data}
                onPublish={onPublish}
                iframe={{ enabled: false }}
                overrides={{
                    components: () => (
                        <CustomDrawer config={config} data={data} />
                    ),
                }}
            >
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Header style={{ background: 'transparent' }}>
                            <Button type="primary" onClick={showDrawer}>
                                Add component
                            </Button>
                        </Header>
                        <Content>
                            <Puck.Preview />
                        </Content>
                    </Layout>
                </Layout>
                <Drawer
                    className="editor-drawer"
                    title="Basic Drawer"
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                >
                    <Puck.Components />
                </Drawer>
            </Puck>
        </>
    );
};

export default CustomEditor;
