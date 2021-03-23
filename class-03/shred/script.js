const cats = ['Ginger','Cabby','CaLlie', 'boufy', 'Fluffy'];

// sort this array in alphabetical order

cats.sort();

// console.log(cats.sort());
// console.log(cats);

const students = [
  {name: 'Dario', age: 21},
  {name: 'Ahmad', age: 37}, 
  {name: 'Aya', age: 24},
]


const compareByAge = (a, b) =>{
  //  console.log(a.age, b.age);
   return  a.age - b.age;
}

const compareByName = (a, b) =>{
   if (a.name < b.name) {
     return -1;
   }
   if (a.name == b.name) {
     return 0;
   }
   if (a.name > b.name) {
     return  1;
   }
}

const compareByNameDesc = (a ,b) =>{
   if (a.name > b.name) {
     return -1;
   }
   if (a.name == b.name) {
     return 0;
   }
   if (a.name < b.name) {
     return  1;
   }
}

students.sort(compareByNameDesc)

console.log(students)
// A B C D

// ASCII
// A => 96
// B = 97
// a = 128
// b = 129

// const ages = [32, 47, 12, 84, 105, 7, -7];



// console.log(ages.sort());