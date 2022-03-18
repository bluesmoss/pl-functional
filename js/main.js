const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);
// {
//   tag: 'h1',
//   attr: {
//     class: 'title'
//   }
// }


const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []

  for (let i = 0 ; i<keys.length ; i++){
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }

  const string =attrs.join('')

  return string
}

const tagAttrs =  obj => (content = "")  => `<${obj.tag} ${obj.attrs ? '' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`


const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  } else {
    return tagAttrs(t);
  }
};

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')
const tableRowTag = tag('row')
// const tableRows = items => tableRowTag(tableCells(items))
const tableRows = items => compose(tableRowTag, tableCells)(items)



let description = document.querySelector("#description")
let calories = document.querySelector("#calories")
let carbs = document.querySelector("#carbs")
let protein = document.querySelector("#protein")


let list = [

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
  updateTotals();
  renderItems();tableRows
}


const updateTotals = () => {
  let calories = 0 
  let carbs = 0
  let protein = 0


  list.map(item => {
    console.log(item);
    calories += item.calories
    carbs += item.carbs
    protein += item.protein

  })

  
 document.querySelector("#totalCalories").textContent = calories
 document.querySelector("#totalCarbs").textContent =carbs
document.querySelector("#totalProtein").textContent =protein
}

const cleanInputs = () => {
  description.value ='';
  calories.value ='';
  carbs.value ='';
  protein.value ='';
}

const renderItems = () => {



  const listWrapper = document.querySelector("#tbody")

  listWrapper.innerHTML = ""  

  list.map((item, index) => {
    const removeButton = tag({
      tag: "button",
      attrs: { class: "btn btn-danger", onClick: `removeItem(${index})` },
    })("X");

    listWrapper.innerHTML += tableRows([
      item.description,
      item.calories,
      item.carbs,
      item.protein,
      removeButton
    ]);
  })


}

const removeItem = (index) => {
  list.splice(index, 1)
  updateTotals()
  renderItems()
}