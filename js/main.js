

let description = document.querySelector("#description")
let calories = document.querySelector("#calories")
let carbs = document.querySelector("#carbs")
let protein = document.querySelector("#protein")
let list = [
  {
    description: "Manzana",
    calories: 10,
    carbs: 10,
    protein: 10,
  },
  {
    description: "Manzana",
    calories: 10,
    carbs: 10,
    protein: 10,
  },
  {
    description: "Manzana",
    calories: 10,
    carbs: 10,
    protein: 10,
  },
  {
    description: "Manzana",
    calories: 10,
    carbs: 10,
    protein: 10,
  },
];


const validateInputs = () => {
  description.value ? '' : description.classList.add('invalid')
  calories.value ? '' : calories.classList.add('invalid')
  carbs.value ? '' : carbs.classList.add('invalid')
  protein.value ? '' : protein.classList.add('invalid')

  if(description.value && calories.value && carbs.value && protein.value) {
    add();
  }
}

description.addEventListener('keydown', () => description.classList.remove('invalid'))
calories.addEventListener('keydown', () => calories.classList.remove('invalid'))
carbs.addEventListener('keydown', () => carbs.classList.remove('invalid'))
protein.addEventListener('keydown', () => protein.classList.remove('invalid'))


const add = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    carbs:  parseInt(carbs.value),
    protein:  parseInt(protein.value),
  }

  list.push(newItem)
  cleanInputs();
}

const cleanInputs = () => {
  description.value ='';
  calories.value ='';
  carbs.value ='';
  protein.value ='';
}