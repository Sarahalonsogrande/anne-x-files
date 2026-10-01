import { ItemLevel } from "@app/core/constants/ui/ui-config.constants";

export interface Item {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    level: ItemLevel;
    image: string;
}

export interface List {
    id: string;
    title: string;
    createdAt?: Date;
    items: Item[];
}
