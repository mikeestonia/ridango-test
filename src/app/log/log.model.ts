export interface LogAction {
    userId: number;
    type: "album" | "photo";
    action: "add" | "delete";
}
