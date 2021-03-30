const foods = ['kanef', 'pizza','tabouleh', 'mansef', 'dawali'];

// Create a new food list without pizza

let newFoods = [];

foods.forEach(food =>{
  if(food !== 'pizza') {
    newFoods.push(food);
  }
});

console.log(newFoods);

// Map will return a new element for each element in our original array

// What is our solutions
console.log('!!!The Filter Method!!!');

// Filter method takes a callback, which receives the element or the array as an argument and if the callback return true, it includes that element in the new array
const triedFoods = ['pizza', 'kanef'];

const newFoods2 = foods.filter(food => {
  return triedFoods.includes(food) ? false : true;
});

console.log(newFoods2);

const students = [
  {
    name: 'Rawan',
    gender: 'f'
  },
  {
     name: 'Abd',
     gender: 'm'
  },
  {
     name: 'Dario',
     gender: 'u'
  },
    {
    name: 'Layan',
    gender: 'f'
  },
    {
    name: 'Osama',
    gender: 'm'
  },
];

console.log(students);
// Return list of female students

const femaleStudents = students.filter(student => student.gender === 'f');
console.log(femaleStudents);

const maleStudents = students.filter(student => student.gender === 'm').map(student => student.name);
console.log(maleStudents);

