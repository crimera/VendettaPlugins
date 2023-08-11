// color reference - https://github.com/Gabe616/VendettaPlugins/blob/main/stuff/types.tsx#L47
import { findByProps } from '@vendetta/metro';
import { rawColors } from '@vendetta/ui';
import { General } from '@vendetta/ui/components';
import React from 'react';

const Router = findByProps('transitionToGuild', 'openURL');

const { TextStyleSheet } = findByProps("TextStyleSheet");
const { Text } = General

export function Link({ text }: React.PropsWithChildren<{ text: string }>) {
    return (
        <SimpleText
            color="#049ce6"
            onPress={() => Router.openURL(text)}>
            {text}
        </SimpleText>
    )
}

export function SimpleText({
    color,
    onPress,
    getChildren,
    children,
}: React.PropsWithChildren<{
    color?: string,
    onPress?: () => void;
    getChildren?: () => React.ReactNode | undefined;
}>) {
    return (
        <Text
            style={[
                TextStyleSheet["text-md/normal"],
                { color: color ? color : rawColors.PRIMARY_100 },
            ]}
            onPress={onPress}
        >
            {getChildren?.() ?? children}
        </Text>
    );
}
