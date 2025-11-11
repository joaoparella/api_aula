export class RetornoPadraoDTO{
    id(id: any) {
        throw new Error('Method not implemented.');
    }
    constructor(
        readonly message: string,
        readonly data: any = null
    ){}
}