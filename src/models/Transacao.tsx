export class Transacao {
    constructor(
        public isCredito : boolean,
        public nome : string,
        public data: Date,
        public valor: number
    ) {}
}