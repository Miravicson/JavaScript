let counter = 0;
let instance: Counter;

class Counter {
  constructor() {
    if (instance) {
      throw new Error(`You can create only one instance of ${this.constructor.name}!`);
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// const counter1 = new Counter();
// const counter2 = new Counter(); // creating a new instance errors out.

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
