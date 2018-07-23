import * as React from 'react';
import { IMenuItem } from '../../services';
export interface MenuItemsProps {
    items: IMenuItem[];
    active?: boolean;
    onActivate?: (item: IMenuItem) => void;
    style?: React.CSSProperties;
    root?: boolean;
}
export declare class MenuItems extends React.Component<MenuItemsProps> {
    render(): JSX.Element;
}
