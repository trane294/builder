import { Button as AntButton, ButtonProps } from 'antd';

export function Button({ children, ...rest }: ButtonProps) {
    return (
        <AntButton
            {...rest}
        >
            {children}
        </AntButton>
    );
}
