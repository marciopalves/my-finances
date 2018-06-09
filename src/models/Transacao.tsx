export class Transacao {
    constructor(
        public tipo : string,
        public nome : string,
        public data: Date,
        public valor: number
    ) {}
}