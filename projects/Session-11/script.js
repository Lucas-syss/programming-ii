class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        return `${this.name} makes a noise.`;
    }

    static info() {
        return `I am an animal class.`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); 
    }

    speak() {
        return `${super.speak()} ${this.name} barks!`;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        return `${super.speak()} MEOW!`;
    }
}

const cat = new Cat("Cat");
const _dog = new Dog("Rex");
console.log(cat.speak(), Animal.info());