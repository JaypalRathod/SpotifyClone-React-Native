import { Colors, Fonts } from "@utils/Constants";
import { Platform, StyleSheet, Text, TextStyle } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8" | "h9" | "body";
    fontFamily?: Fonts,
    fontSize?: number;
    style?: TextStyle | TextStyle[];
    children?: React.ReactNode;
    numberOfLines?: number;
    onlayout?: (event: object) => void;
}

const CustomText: React.FC<Props> = ({
    variant = 'body',
    fontFamily = Fonts.Regular,
    fontSize,
    style,
    children,
    numberOfLines,
    onlayout,
    ...props
}) => {

    let computedFontSize: number = Platform.OS === 'android' ? RFValue(fontSize || 12) : RFValue(fontSize || 10);
    switch (variant) {
        case 'h1':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 24) : RFValue(fontSize || 22);
            break;
        case 'h2':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 22) : RFValue(fontSize || 20);
            break;
        case 'h3':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 20) : RFValue(fontSize || 18);
            break;
        case 'h4':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 18) : RFValue(fontSize || 16);
            break;
        case 'h5':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 16) : RFValue(fontSize || 14);
            break;
        case 'h6':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 12) : RFValue(fontSize || 10);
            break;
        case 'h7':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 10) : RFValue(fontSize || 9);
            break;
        case 'body':
            computedFontSize = Platform.OS === 'android' ? RFValue(fontSize || 14) : RFValue(fontSize || 12);
            break;
    }

    const fontFamilyStyle = {
        fontFamily
    }

    return (
        <Text onLayout={onlayout} style={[
            styles.text,
            { color: Colors.text, fontSize: computedFontSize },
            fontFamilyStyle,
            style
        ]}
            numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
            {...props}
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
    }
})

export default CustomText;