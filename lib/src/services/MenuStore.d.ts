import { SpecStore } from './models';
import { ScrollService } from './ScrollService';
export declare type MenuItemGroupType = 'group' | 'tag' | 'section';
export declare type MenuItemType = MenuItemGroupType | 'operation';
/** Generic interface for MenuItems */
export interface IMenuItem {
    id: string;
    absoluteIdx?: number;
    name: string;
    description?: string;
    depth: number;
    active: boolean;
    items: IMenuItem[];
    parent?: IMenuItem;
    deprecated?: boolean;
    type: MenuItemType;
    deactivate(): void;
    activate(): void;
}
export declare const SECTION_ATTR = "data-section-id";
/**
 * Stores all side-menu related information
 */
export declare class MenuStore {
    private spec;
    private _scrollService;
    /**
     * Statically try update scroll position
     * Used before hydrating from server-side rendered html to scroll page faster
     */
    static updateOnHash(hash: string | undefined, scroll: ScrollService): void;
    /**
     * active item absolute index (when flattened). -1 means nothing is selected
     */
    activeItemIdx: number;
    /**
     * whether sidebar with menu is opened or not
     */
    sideBarOpened: boolean;
    /**
     * cached flattened menu items to support absolute indexing
     */
    private _unsubscribe;
    private _hashUnsubscribe;
    private _items?;
    /**
     *
     * @param spec [SpecStore](#SpecStore) which contains page content structure
     * @param _scrollService scroll service instance used by this menu
     */
    constructor(spec: SpecStore, _scrollService: ScrollService);
    toggleSidebar(): void;
    closeSidebar(): void;
    /**
     * top level menu items (not flattened)
     */
    readonly items: IMenuItem[];
    /**
     * update active items on scroll
     * @param isScrolledDown whether last scroll was downside
     */
    updateOnScroll(isScrolledDown: boolean): void;
    /**
     * update active items on hash change
     * @param hash current hash
     */
    updateOnHash(hash?: string): boolean;
    /**
     * get section/operation DOM Node related to the item or null if it doesn't exist
     * @param idx item absolute index
     */
    getElementAt(idx: number): Element | null;
    /**
     * current active item
     */
    readonly activeItem: IMenuItem;
    getItemById: (id: string) => IMenuItem | undefined;
    /**
     * flattened items as they appear in the tree depth-first (top to bottom in the view)
     */
    readonly flatItems: IMenuItem[];
    /**
     * activate menu item
     * @param item item to activate
     * @param updateHash [true] whether to update location hash
     * @param rewriteHistory [false] whether to rewrite browser history (do not create new enrty)
     */
    activate(item: IMenuItem | undefined, updateHash?: boolean, rewriteHistory?: boolean): void;
    /**
     * makes item and all the parents not active
     * @param item item to deactivate
     */
    deactivate(item: IMenuItem | undefined): void;
    /**
     * activate menu item and scroll to it
     * @see MenuStore.activate
     */
    activateAndScroll(item: IMenuItem | undefined, updateHash?: boolean, rewriteHistory?: boolean): void;
    /**
     * scrolls to active section
     */
    scrollToActive(): void;
    dispose(): void;
}
