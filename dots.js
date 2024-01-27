const dotIndicators = document.querySelector('.dot-indicators');
const dots = dotIndicators.querySelectorAll('button');
const crewInfo = document.querySelector('.crew-info');
const crewImage = document.querySelector('.crew-image');
dotIndicators.addEventListener('keydown', changeDotFocus);

dots.forEach((dot,index)=>{
    dot.addEventListener('click', changeDotData.bind(null,index));
    dot.addEventListener('click', changeActiveDot);
})

async function changeDotData(index){
    const response = await axios.get('data.json');
    const data = response.data.crew;
    const dotData = data[index];


    crewImage.src = dotData.images.png;
    crewInfo.innerHTML = `
        <h2 class="fs-600 ff-serif uppercase text-white">${dotData.role}</h2>
        <p class="fs-700 ff-serif uppercase text-white">${dotData.name}</p>
        <p>
            ${dotData.bio}
        </p>
    `;
   
}

let dotFocus = 0;

function changeActiveDot(e){
//    slideDotDataDown() 

   const currentDot = dotIndicators.querySelector('[aria-selected = "true"]')
   const targetDot = e.target
   currentDot.setAttribute('aria-selected',false);
   targetDot.setAttribute('aria-selected',true); 
   
//    setTimeout( slideDotDataUp,100);
}
function changeDotFocus(e){
    const keyDownLeft = 37;
    const keyDownRight = 39;

    if(e.keyCode === keyDownLeft || e.keyCode === keyDownRight){
        dots[dotFocus].setAttribute('tabindex',-1);
    }

    if(e.keyCode === keyDownRight){
        dotFocus++;
        if(dotFocus >= dots.length){
            dotFocus = 0;
        }

    } else if(e.keyCode === keyDownLeft){
        dotFocus--;
        if(dotFocus < 0 ){
            dotFocus = dots.length - 1;
        }

    }
    dots[dotFocus].setAttribute("tabindex", 0);
    dots[dotFocus].focus();
}

// function slideDotDataDown(){
//     destinationInfo.style.transition = '';
//     destinationInfo.style.transform = 'translateY(30px)';
//     destinationInfo.style.opacity = '0';
// }
// function slideDotDataUp(){
//     destinationInfo.style.transition = "opacity 0.5s ease, transform 0.5s ease" ;
//     destinationInfo.style.transform = 'translateY(0)';
//     destinationInfo.style.opacity = '1';
// }


