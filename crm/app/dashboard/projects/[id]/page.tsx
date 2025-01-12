'use client';

import { Button } from 'antd';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Page() {
    const { id } = useParams();

    return <div>
        <p>Project Page</p>
        <Link
            href={`/editor/${id}`}
        >
            <Button>Edit</Button>
        </Link>
    </div>;
}