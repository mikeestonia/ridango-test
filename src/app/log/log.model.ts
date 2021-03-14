export interface LogAction {
    id: string;
    type: "album" | "photo";
    action: "add" | "delete";
}
