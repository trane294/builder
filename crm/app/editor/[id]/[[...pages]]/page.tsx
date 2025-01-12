'use client';

import '@measured/puck/puck.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { Data } from '@measured/puck';
import { Puck } from '@measured/puck';
import config from '@/puck.config';
import { updateProject } from '@/app/lib/modules/projects/actions';
import { useParams } from 'next/navigation';

export default function Page() {
    const { id, pages } = useParams<{ id: string; pages: string }>();
    const pagePath = `/editor/${id}`;
    const [template, setTemplate] = useState({});
    const [puckData, setPuckData] = useState(null);

    let path = '/';
    if (pages && Array.isArray(pages)) {
        path = `${path}${pages.join('/')}`;
    }

    useEffect(() => {
        async function initFn() {
            const result = await axios.post(`/api/${id}`, {
                path: path
            });

            setTemplate(result.data);
            setPuckData(result.data[path]);
        }

        initFn();
    }, [id]);

    if (!puckData) return <div>Loading...</div>;

    return <Puck
        config={config}
        data={puckData}
        onPublish={async (newPuckData) => {
            let newTemplate = template as any;
            newTemplate[path] = newPuckData;

            await updateProject(id, newTemplate, pagePath);
        }}
        overrides={{
            // Render a custom element for each item in the component list
            // componentItem: ({ name }) => (
            //     <div style={{ backgroundColor: "hotpink" }}>{name}</div>
            // ),
        }}
    />;
}

// export const dynamic = 'force-dynamic';