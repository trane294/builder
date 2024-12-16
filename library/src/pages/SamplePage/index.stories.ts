import type { Meta, StoryObj } from '@storybook/react';

import { SamplePage } from './index';

// import * as PageLayout from './PageLayout.stories';
// import * as DocumentHeader from './DocumentHeader.stories';
// import * as DocumentList from './DocumentList.stories';
import * as PageContainer from '../../../lib/components/PageContainer/index';
import * as Hero from '../../../lib/components/Hero';
import * as Section1 from '../../../lib/components/Section1';

const meta: Meta<typeof SamplePage> = {
    component: SamplePage,
};

export default meta;
type Story = StoryObj<typeof SamplePage>;

export const Simple: Story = {
    args: {
        // user: PageLayout.Simple.args.user,
        // document: DocumentHeader.Simple.args.document,
        // subdocuments: DocumentList.Simple.args.documents,
    },
};