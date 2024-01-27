const numberedSliders = document.querySelector('.numbered-slider');
const numbers = numberedSliders.querySelectorAll('button');
const technologyInfo = document.querySelector('.technology-info');
const technologyImage = document.querySelector('.technology-img');
const displaySize = window.innerWidth;
numberedSliders.addEventListener('keydown', changeNumberFocus);

numbers.forEach((number,index)=>{
    number.addEventListener('click', changeNumberData.bind(null,index));
    number.addEventListener('click', changeActiveNumber);
})

async function changeNumberData(index){
    const response = await axios.get('data.json');
    const data = response.data.technology;
    const numberData = data[index];

    updateNumberImage(numberData);
    // updateNumberImage()
    
    technologyInfo.innerHTML = `
    <h2 class="fs-300 ff-serif uppercase text-white">The terminology...</h2>
    <p class="fs-700 ff-serif uppercase text-white"> ${numberData.name}</p>
    <p>
       ${numberData.description}
    </p>
    `;
   
}

function updateNumberImage(numberData){
    // console.log('WORK')
    if(displaySize <= "880"){
        // technologyImage.style.content =  `url(${numberData.images.landscape})`;
        technologyImage.src = numberData.images.landscape;
    }
    else{
        technologyImage.style.content =  `url(${numberData.images.portrait})`; 
    }
}

let numberFocus = 0;
function changeActiveNumber(e){
    

   const currentNumber = numberedSliders.querySelector('[aria-selected = "true"]')
   const targetNumber = e.target
   currentNumber.setAttribute('aria-selected',false);
   targetNumber.setAttribute('aria-selected',true); 
   
}
function changeNumberFocus(e){
    const keyDownArrowUP = 38;
    const keyDownArrowDown = 40;
    
    if(e.keyCode === keyDownArrowUP || e.keyCode === keyDownArrowDown){
        numbers[numberFocus].setAttribute('tabindex',-1);
    }

    if(e.keyCode === keyDownArrowDown){
        numberFocus++;
        if(numberFocus >= numbers.length){
            numberFocus = 0;
        }

    } else if(e.keyCode === keyDownArrowUP){
        numberFocus--;
        if(numberFocus < 0 ){
            numberFocus = numbers.length - 1;
        }

    }
    numbers[numberFocus].setAttribute("tabindex", 0);
    numbers[numberFocus].focus();
}