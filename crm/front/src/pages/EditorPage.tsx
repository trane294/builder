import { Config, Puck } from '@measured/puck';
import '@measured/puck/puck.css';

type Components = {
    HeadingBlock: {
        children: string;
    };
};

const config: Config<Components> = {
    components: {
        HeadingBlock: {
            fields: {
                children: {
                    type: "text",
                },
            },
            render: ({ children }) => {
                return <h1>{children}</h1>;
            },
        },
    },
};

const initialData: Record<string, any> = {};

const save = (data: Record<string, any>) => {
    console.log(data);
};

export default function EditorPage() {
    return <Puck config={config} data={initialData} onPublish={save} />;
};