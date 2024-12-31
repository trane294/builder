import { Button } from 'antd';
import Link from 'next/link';

export default function Page() {
    return <div>
        <p>Project Page</p>
        <Link
            href="/editor/1"
        >
            <Button>Edit</Button>
        </Link>
    </div>;
}