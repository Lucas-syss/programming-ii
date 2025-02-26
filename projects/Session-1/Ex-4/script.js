class Student {
    constructor(name) {
        this.name = name;
        this.grades = [];
    }

    addGrade(grade) {
        this.grades.push(grade);

    }

    calculateFinalGrade() {
        if (this.grades.length === 0) return 0;
        
        return this.grades.reduce((a, b) => a + b) / this.grades.length;
    }
}
