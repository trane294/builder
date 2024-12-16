// import type { Meta } from '@storybook/react';
import type { Meta, StoryObj } from '@storybook/react';

import { Section1 } from '.';

const meta = {
    title: 'Example/Section1',
    component: Section1,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Section1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {};