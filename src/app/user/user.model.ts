export interface User {
    id: number;
    name: string;
}

export interface Album {
    id: number;
    userId: number;
    title: string;
}
