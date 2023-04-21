export class Levels {
	public inicial: number;
	public primaria: number;
	public secundaria: number;
	private _total: number;

	constructor(inicial: number, primaria: number, secundaria: number) {
		this.inicial = inicial;
		this.primaria = primaria;
		this.secundaria = secundaria;
		this._total = this.inicial + this.primaria + this.secundaria;
	}

	getTotal() {
		// return this.inicial + this.primaria + this.secundaria;
		return this._total;
	}
}
