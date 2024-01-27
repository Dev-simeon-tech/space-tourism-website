const tabList = document.querySelector('.tab-list');
const tabs = tabList.querySelectorAll('button');
const destinationInfo = document.querySelector('.destination-info')
const destinationImage = document.querySelector('.destination-image')
tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab,index)=>{
    tab.addEventListener('click', changeTabData.bind(null,index));
    tab.addEventListener('click', changeActiveTab);
})

async function changeTabData(index){
    const response = await axios.get('data.json');
    const data = response.data.destinations;
    const tabData = data[index];


    destinationImage.src = tabData.images.png;
    destinationInfo.innerHTML = `
    <h2 class="fs-800 ff-serif uppercase">${tabData.name}</h2>
    
    <p>
       ${tabData.description}
    </p>
    <div class="destination-meta flex">

        <div>
            <h3 class="ff-200 fs-200  ff-sans-cond letter-spacing-3 text-accent uppercase">Avg. distance</h3>
            <p class="fs-500 ff-serif ">${tabData.distance}</p>
        </div>
        <div>
            <h3 class="ff-200 fs-200 ff-sans-cond letter-spacing-3  text-accent uppercase">Est. travel time</h3>
            <p class="fs-500 ff-serif">${tabData.travel}</p>
        </div>
    </div>
    `;
   
}

let tabFocus = 0;

function changeActiveTab(e){
   slideTabDataDown() 

   const currentab = tabList.querySelector('[aria-selected = "true"]')
   const targetTab = e.target
   currentab.setAttribute('aria-selected',false);
   targetTab.setAttribute('aria-selected',true); 
   
   setTimeout( slideTabDataUp,100)
}
function changeTabFocus(e){
    const keyDownLeft = 37;
    const keyDownRight = 39;

    if(e.keyCode === keyDownLeft || e.keyCode === keyDownRight){
        tabs[tabFocus].setAttribute('tabindex',-1);
    }

    if(e.keyCode === keyDownRight){
        tabFocus++;
        if(tabFocus >= tabs.length){
            tabFocus = 0;
        }

    } else if(e.keyCode === keyDownLeft){
        tabFocus--;
        if(tabFocus < 0 ){
            tabFocus = tabs.length -1;
        }

    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus()
}

function slideTabDataDown(){
    destinationInfo.style.transition = ''
    destinationInfo.style.transform = 'translateY(30px)';
    destinationInfo.style.opacity = '0';
}
function slideTabDataUp(){
    destinationInfo.style.transition = "opacity 0.5s ease, transform 0.5s ease" ;
    destinationInfo.style.transform = 'translateY(0)';
    destinationInfo.style.opacity = '1';
}


