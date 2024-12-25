import { theme as AntTheme } from 'antd';
import type { ThemeConfig } from 'antd';
// import { white } from '@ant-design/colors';

const theme: ThemeConfig = {
    // algorithm: AntTheme.compactAlgorithm,
    token: {
        fontSize: 16,
        // colorPrimary: '#52C41A',
    },
    components: {
        Layout: {
            headerBg: 'white',
        }
    }
};

export default theme;