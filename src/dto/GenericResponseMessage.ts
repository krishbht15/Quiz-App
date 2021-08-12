export class GenericResponseMessage {
    private readonly success: boolean;
    private readonly message: string;
    private readonly data: string;

    constructor(success: boolean, message: string, data: string) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
