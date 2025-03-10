import { Config, FieldProps } from '@measured/puck';
import ImageUploader from 'src/components/editor/ImageUploader';
import { useAppSelector } from 'src/hooks';
import FooterPhoto1 from 'src/templates/photo-1/footer';
import HeroPhoto1 from 'src/templates/photo-1/hero';
import LayoutPhoto1 from 'src/templates/photo-1/layout';
import MenuPhoto1 from 'src/templates/photo-1/menu';
import SectionPhoto1 from 'src/templates/photo-1/section';

export type Components = {
    HeroPhoto1: {
        title: string;
        name: string;
        imageUrl?: {
            field: object;
            value: string;
        };
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

export const photo1Config = (
    username: string
): Config<Components, RootProps> => ({
    components: {
        HeroPhoto1: {
            fields: {
                title: {
                    type: 'text',
                    label: 'Title',
                },
                name: {
                    type: 'text',
                    label: 'Full Name',
                },
                imageUrl: {
                    type: 'custom',
                    render: ({ field, value, onChange }: FieldProps) => (
                        <ImageUploader
                            value={value}
                            onChange={(url) => onChange({ field, value: url })}
                        />
                    ),
                },
            },
            defaultProps: {
                title: 'Demo Store',
                name: username || 'John Smith',
            },
            render: ({ title, name, imageUrl }) => {
                return (
                    <>
                        <HeroPhoto1 title={title} name={name} imageUrl={imageUrl}></HeroPhoto1>
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
});
