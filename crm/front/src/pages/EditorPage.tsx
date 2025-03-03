import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Puck, Config } from '@measured/puck';
import '@measured/puck/puck.css';
import { photo1Config } from 'src/templates/photo-1/config';

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const { id: templateId } = useParams<{ id: string }>();
    const params = useParams();
    const [config, setConfig] = useState<Config<any, any> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Example: some initial data
    const [initialData] = useState<Record<string, any>>({});

    // A function to handle Puck's onPublish
    const save = (data: Record<string, any>) => {
        console.log('onPublish data:', data);
        // Could POST to your server to store the data
    };

    // Fetch config from your API whenever templateId changes
    useEffect(() => {
        // if (!templateId) return;

        // setLoading(true);
        // setError(null);

        // fetch(`http://localhost:4000/api/templates/${templateId}`)
        //     .then((res) => {
        //         if (!res.ok) {
        //             throw new Error(`Failed to fetch config: ${res.status}`);
        //         }
        //         return res.json();
        //     })
        //     .then((fetchedConfig) => {
        //         setConfig(fetchedConfig);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         setError(err.message);
        //         setLoading(false);
        //     });

        setConfig(photo1Config);
        setLoading(false);
    }, [templateId]);

    if (!templateId) {
        return <div>No template id provided.</div>;
    }

    if (loading) {
        return <div>Loading template config...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    return <Puck config={config} data={initialData} onPublish={save} />;
}
