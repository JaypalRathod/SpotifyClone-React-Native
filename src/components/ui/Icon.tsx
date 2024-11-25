import { FC } from "react";
import { Colors } from "@utils/Constants";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
    color?: string;
    size: number;
    name: string;
    iconFamily?: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons';
}

const Icon: FC<IconProps> = ({ color = Colors.text, size, name, iconFamily }) => {
    switch (iconFamily) {
        case 'Ionicons':
            return <Ionicons name={name} size={size} color={color} />;
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={name} size={size} color={color} />;
        case 'MaterialIcons':
            return <MaterialIcons name={name} size={size} color={color} />;
        default:
            return null;
    }
}

export default Icon