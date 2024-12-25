import { Button } from 'antd';
import Link from 'next/link';

export default function Page() {
    return <div>
        <p>Project Page</p>
        <Link
            href="/dashboard/projects/1/editor"
        >
            <Button>Edit</Button>
        </Link>
    </div>;
}