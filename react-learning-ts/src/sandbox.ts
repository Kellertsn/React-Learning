// let sales = 123_456_789;
// let course = 'TypeScript';
// let is_published = true;
// let level;

// level = 1;
// level = 'a';

// let numbers: number[] = [];
// numbers.forEach(n => n.)

//tuples
// 1, 'Mosh'
// let user: [number, string] = [1, 'Mosh'];
// user.push(1);
// console.log(user)

//enum
// const small =1;
// const medium = 2;
// const large = 3;

//PascalCase
// const enum Size {Small = 4, Medium, Large };
// let mySize: Size = Size.Medium;
// console.log(mySize)

// function calculateTax(income: number, taxYear = 2022): number {
//     if (taxYear < 2022) return income * 1.2;
//     // undefined
//     return income * 1.3
// }

// calculateTax(10_000);

//Objects
let employee: Employee = {
  id: 1,
  name: "Mo",
  retire: (date: Date) => {
    console.log(date);
  },
};

employee.id = 0;

//advanced type
//type aliases
type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

//Union types
function kgToLbs(weight: number | string): number {
  //Narrowing
  if (typeof weight === "number") return weight * 2.2;
  return parseInt(weight) * 2.2;
}

kgToLbs(10);
kgToLbs("10kg");

// Intersection types
type Draggable = {
  drag: () => void; //method
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

//Literal Types
//Literal (exact, specific)

type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = "cm" | "inch";

//nullable types
function greet(name: string | null | undefined) {
  if (name) console.log(name.toUpperCase());
  else console.log("Hola!");
}

greet(undefined);

//Optional Chaining
type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined{
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);
// if (customer !== null && customer !== undefined) console.log(customer.birthday);

// Optional property access operator
console.log(customer?.birthday?.getFullYear());

//optional element access operator
// if (customers !== null && customers !== undefined)
//  customers[0]
// console.log(customers?.[0])

//optional call
// let log: any = (message:string) => console.log(message)
let log: any = null;
log?.('a');