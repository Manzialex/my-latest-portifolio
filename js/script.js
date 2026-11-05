const navlinks = document.querySelectorAll('.nav-link');
console.log(navlinks);
navlinks.forEach(function(link) {
    link.addEventListener("click", function(){
        navlinks.forEach(function(item) {
            item.classList.remove("active");
        });
        link.classList.add("active");
    });
});