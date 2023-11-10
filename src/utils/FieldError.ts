interface IFieldError {
    msg: string,
    field: string
}
export default class FieldError extends Error {
    private _err: IFieldError
    constructor(err: IFieldError) {
        super()
        this._err = err
        super.message = err.msg;

    }


    public get err(): IFieldError {
        return this._err
    }


}