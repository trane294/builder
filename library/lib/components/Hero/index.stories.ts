// import type { Meta } from '@storybook/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Hero } from '.';

const meta = {
    title: 'Example/Hero',
    component: Hero,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};