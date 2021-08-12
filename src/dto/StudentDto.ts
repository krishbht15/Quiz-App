export default class StudentDto {
    private _name: string;
    private _class: string;

    get class(): string {
        return this._class;
    }

    set class(value: string) {
        this._class = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }


}
