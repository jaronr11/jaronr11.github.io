const hamburger = document.querySelector('.nav-toggle');
        let toggled = false;
        hamburger.addEventListener('click', showInfo);

        const nav = document.querySelector(".nav-bar")
        function showInfo() {
            nav.classList.toggle("show");
            if (toggled == false){
                hamburger.setAttribute("aria-expanded", "true");
                hamburger.classList.toggle("rotate");
                toggled=true;
            }
            else
            {
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.toggle("rotate");
                toggled=false;
            }
            
        }
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}