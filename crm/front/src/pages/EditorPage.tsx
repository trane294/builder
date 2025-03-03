import { Config, Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import FooterPhoto1 from 'src/templates/photo-1/footer';
import HeroPhoto1 from 'src/templates/photo-1/hero';
import LayoutPhoto1 from 'src/templates/photo-1/layout';
import MenuPhoto1 from 'src/templates/photo-1/menu';
import SectionPhoto1 from 'src/templates/photo-1/section';

type Components = {
    HeroPhoto1: {
        children: string;
    };
    MenuPhoto1: {
        children: string;
    };
    SectionPhoto1: {
        children: string;
    };
    FooterPhoto1: {
        children: string;
    };
};

type RootProps = {
    title: string;
};

const config: Config<Components, RootProps> = {
    components: {
        HeroPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <HeroPhoto1></HeroPhoto1>
                    </>
                );
            },
        },
        MenuPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <MenuPhoto1></MenuPhoto1>
                    </>
                );
            },
        },
        SectionPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <SectionPhoto1></SectionPhoto1>
                    </>
                );
            },
        },
        FooterPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <FooterPhoto1></FooterPhoto1>
                    </>
                );
            },
        },
    },
    root: {
        fields: {
            title: {
                type: 'text',
            },
        },
        render: ({ children }) => {
            return (
                <>
                    <LayoutPhoto1>{children}</LayoutPhoto1>
                </>
            );
        },
    },
};

const initialData: Record<string, any> = {};

const save = (data: Record<string, any>) => {
    console.log(data);
};

export default function EditorPage() {
    return <Puck config={config} data={initialData} onPublish={save} />;
}
