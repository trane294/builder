import type { Config } from "@measured/puck";
import { Button } from '@johndoe/library';

type Props = {
    HeadingBlock: { title: string };
    Button: { title: string };
};

export const config: Config<Props> = {
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
    },
};

export default config;
