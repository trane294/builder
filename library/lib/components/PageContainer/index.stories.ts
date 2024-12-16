// import type { Meta } from '@storybook/react';
import type { Meta, StoryObj } from '@storybook/react';

import { PageContainer } from '.';

const meta = {
    title: 'Example/PageContainer',
    component: PageContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
    args: {
        children: 'Hello, world!',
    },
};