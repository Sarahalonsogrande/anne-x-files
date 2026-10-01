import { List } from '@app/features/lists-items/models/item.model';

export const GATETES: List = {
    id: 'gatetes',
    title: 'listTitles.kittycats.title',
    items: [
        {
            id: crypto.randomUUID(),
            title: "Frida",
            subtitle: "Lindos gatetes",
            description: "Lindos gatetes.",
            level: "high",
            image: "/images/frida.png"
        },
        {
            id: crypto.randomUUID(),
            title: "Miso",
            subtitle: "Lindos gatetes",
            description: "Lindos gatetes.",
            level: "medium",
            image: "/images/miso.png"
        },
        {
            id: crypto.randomUUID(),
            title: "Olive",
            subtitle: "Lindos gatetes",
            description: "Lindos gatetes.",
            level: "low",
            image: "/images/olive.png"
        },
        {
            id: crypto.randomUUID(),
            title: "Misii",
            subtitle: "Lindos gatetes",
            description: "Lindos gatetes.",
            level: "funny",
            image: "/images/misi.png"
        }
    ]
};
