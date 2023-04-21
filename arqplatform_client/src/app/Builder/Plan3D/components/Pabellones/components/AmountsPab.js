class AmountsPab {
	constructor(p) {
		this.side1;
		this.side2;
		p === 1 ? this.forPab1() : this.forPab2();
	}

	forPab1() {
		this.side1 = Math.ceil(pab[1].max_classrooms / 2);
		this.side2 = pab[1].max_classrooms - this.side1;

		remaining_classrooms -= pab[1].max_classrooms;
	}

	forPab2() {
		let b = remaining_classrooms <= pab[2].max_classrooms ? remaining_classrooms : pab[2].max_classrooms;
		this.side1 = Math.ceil(b / 2);
		this.side2 = b - this.side1;
		
		remaining_classrooms -= this.side1 + this.side2;
	}
}