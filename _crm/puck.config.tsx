import type { Config } from "@measured/puck";
import { Button, PageContainer, Hero, Section1 } from '@johndoe/library';

type Props = {
    HeadingBlock: { title: string };
    Button: { title: string };
    // PageContainer: { children: React.ReactNode };
    Hero: {};
    Section: {};
};

export const config: Config<Props> = {
    root: {
        render: ({ children }) => {
            return <PageContainer>
                {children}
            </PageContainer>;
        },
    },
    components: {
        HeadingBlock: {
            fields: {
                title: { type: "text" },
            },
            defaultProps: {
                title: "Heading",
            },
            render: ({ title }) => (
                <div style={{ padding: 64 }}>
                    <h1>{title}</h1>
                </div>
            ),
        },
        Button: {
            fields: {
                title: { type: "text" },
            },
            defaultProps: {
                title: "Heading",
            },
            render: ({ title }) => (
                <Button>{title}</Button>
            ),
        },
        // PageContainer: {
        //     fields: {
        //         children: <div />,
        //     },
        //     defaultProps: {
        //         children: <div />,
        //     },
        //     render: ({ children }) => (
        //         <PageContainer>{children}</PageContainer>
        //     ),
        // },
        Hero: {
            fields: {},
            defaultProps: {},
            render: () => <Hero />,
        },
        Section: {
            fields: {},
            defaultProps: {},
            render: () => <Section1 />,
        }
    },
};

export default config;
