function people() {

    abstract class Employee {
        public name: string;
        public age: number;
        public tasks: string[];
        public salary: number;
        public dividend: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
            this.tasks = [];
            this.salary = 0;
            this.dividend = 0;

            if (new.target === Employee) {
                throw new Error('Cannot instantiate Employee');
            }
        }

        work(): void {
            let currentTask = this.tasks.shift() || '';
            console.log(`${this.name} ${currentTask}`);
            this.tasks.push(currentTask);
        }

        collectSalary(): void {
            let bonuses = this.dividend !== 0 ? this.dividend : 0;
            console.log(`${this.name} received ${this.salary + bonuses}`);
        }
    }

    class Junior extends Employee {
        constructor(name: string, age: number) {
            super(name, age);
            this.tasks.push('is working on a simple task.');
        }
    }

    class Senior extends Employee {
        constructor(name: string, age: number) {
            super(name, age);
            this.tasks.push('is working on a complicated task.');
            this.tasks.push('is taking time off work.');
            this.tasks.push('is supervising junior workers.');
        }
    }

    class Manager extends Employee {
        constructor(name: string, age: number) {
            super(name, age);
            this.tasks.push('scheduled a meeting.');
            this.tasks.push('is preparing a quarterly report.');

        }
    }

    return {
        Junior,
        Senior,
        Manager
    }
}

let instance = people();

let juniorDev = new instance.Junior('Pesho', 25);
let seniorDev = new instance.Senior('Gosho', 30);
let manager = new instance.Manager('Stamat', 40);

console.log(juniorDev, seniorDev, manager);