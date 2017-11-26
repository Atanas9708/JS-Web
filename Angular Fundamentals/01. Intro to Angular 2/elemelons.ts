function elemelons() {
    abstract class Melon {
        public weight: number;
        public melonSort: string;
        public elementIndex: number;
        public element: string;

        constructor(weight: number, melonSort: string) {
            this.weight = weight;
            this.melonSort = melonSort;
            this.elementIndex = this.weight * this.melonSort.length;
            this.element = '';

            if (new.target === Melon) {
                throw new Error('Cannot instantiate Melon');
            }
        }

        getElementIndex(): number {
            return this.elementIndex;
        }

        toString(): void {
            console.log(`Element: ${this.element}`);
            console.log(`Sort: ${this.melonSort}`);
            console.log(`Element Index: ${this.elementIndex}`);
        }
    }

    class Watermelon extends Melon {
        constructor(weight: number, melonSort: string) {
            super(weight, melonSort);
            this.element = 'Water';
        }
    }

    class Firemelon extends Melon {
        constructor(weight: number, melonSort: string) {
            super(weight, melonSort);
            this.element = 'Fire';
        }
    }

    class Earthmelon extends Melon {
        constructor(weight: number, melonSort: string) {
            super(weight, melonSort);
            this.element = 'Earth';
        }
    }

    class Airmelon extends Melon {
        constructor(weight: number, melonSort: string) {
            super(weight, melonSort);
            this.element = 'Air';
        }
    }

    class Melolemonmelon extends Watermelon {
        public elements: string[];

        constructor(weight: number, melonSort: string) {
            super(weight, melonSort);
            this.elements = ['Fire', 'Earth', 'Air'];
            this.element = 'Water';
        }

        morph(): void {
            let currentElemet = this.element;
            this.elements.push(currentElemet);
            let nextElement = this.elements[0];
            this.element = nextElement;
            let indexOfNextElement = this.elements.lastIndexOf(nextElement);
            this.elements.splice(indexOfNextElement, 1);
        }
    }

    return {
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    };
}

const melons = elemelons();

// let watermelon = new melons.Watermelon(12.5, 'Kingsize');
// let firemelon = new melons.Firemelon(8, 'Huge');
// let earthmelon = new melons.Earthmelon(3, 'Medium');
// let airmelon = new melons.Airmelon(1, 'Small');

// console.log(watermelon.toString());
// console.log(firemelon.toString());
// console.log(earthmelon.toString());
// console.log(airmelon.toString());

let melolemonmelon = new melons.Melolemonmelon(5, 'Kingsize');
melolemonmelon.morph();
melolemonmelon.morph();
melolemonmelon.morph();
melolemonmelon.morph();
console.log(melolemonmelon.toString());