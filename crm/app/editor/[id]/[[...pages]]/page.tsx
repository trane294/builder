'use client';

import '@measured/puck/puck.css';
import { useState, useEffect } from 'react';
import type { Data } from '@measured/puck';
import { Puck } from '@measured/puck';
import config from '@/puck.config';
import { updateProject } from '@/app/lib/modules/projects/actions';
import { useParams } from 'next/navigation';

export default function Page() {
    const { id } = useParams();
    const path = `/editor/${id}`;
    const [data, setData] = useState(null);

    useEffect(() => {
        async function initFn() {
            const result = await fetch('/api');
            const json = await result.json();

            setData(json.project.template);
        }

        initFn();
    }, [id]);

    if (!data) return <div>Loading...</div>

    return <Puck
        config={config}
        data={data}
        onPublish={async (data) => {
            // await fetch('/editor/api', {
            //     method: 'post',
            //     body: JSON.stringify({ data, path }),
            // });
            console.log(123);

            await updateProject('1', data, path);
        }}
    />;
}

// export const dynamic = 'force-dynamic';