const primaryNavigation = document.querySelector('.primary-navigation');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

mobileNavToggle.addEventListener('click', ()=>{
    const visibility = primaryNavigation.getAttribute('data-visible');
    if(visibility === "false"){
        primaryNavigation.setAttribute("data-visible",true)
        mobileNavToggle.setAttribute("aria-expanded",true)
    }
    else{
        primaryNavigation.setAttribute("data-visible", false) 
        mobileNavToggle.setAttribute("aria-expanded",false)

    }

})