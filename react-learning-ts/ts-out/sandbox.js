"use strict";
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
let employee = {
    id: 1,
    name: "Mo",
    retire: (date) => {
        console.log(date);
    },
};
employee.id = 0;
//Union types
function kgToLbs(weight) {
    //Narrowing
    if (typeof weight === 'number') {
    }
}
kgToLbs(10);
kgToLbs('10kg');
//# sourceMappingURL=sandbox.js.map