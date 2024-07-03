export interface ITask {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean //? significa que es opcional
}