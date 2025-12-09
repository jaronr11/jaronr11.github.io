const hamburger = document.querySelector('.nav-toggle');
        let toggled = false;
        hamburger.addEventListener('click', showInfo);
        const nav = document.querySelector(".nav-bar")
        function showInfo() {
            nav.classList.toggle("show");
            if (toggled == false){
                hamburger.setAttribute("aria-expanded", "true");
                hamburger.classList.toggle("rotate");
                hamburger.classList.toggle("move-down");
                toggled=true;
            }
            else
            {
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.classList.toggle("rotate");
                hamburger.classList.toggle("move-down");
                toggled=false;
            }
            
        }
//darkmode code from geeks4geeks https://www.geeksforgeeks.org/javascript/how-to-make-dark-mode-for-websites-using-html-css-javascript/
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

