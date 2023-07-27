const person = {
  name: 'John Doe',
  age: 42,
  nationality: 'American',
};

const personProxy = new Proxy(person, {
  get: (target: typeof person, prop: keyof typeof person) => {
    const value = Reflect.get(target, prop);
    console.log(`The value of ${prop} is ${value}`);
    return value;
  },

  set: (target: typeof person, prop: keyof typeof person, value) => {
    console.log(`Changed ${prop} from ${target[prop]} to ${value}`);

    if (prop in target && typeof target[prop] === typeof value) {
      Reflect.set(target, prop, value);
    }
    return true;
  },
});

console.log(personProxy.name);
personProxy.age = 43;
console.log(personProxy.age);
