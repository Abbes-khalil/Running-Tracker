function speedcal(){
    const distance = document.getElementById("distance").value;
    const time = document.getElementById("time").value;
    if (distance && time) {
        const speed = time / distance;
        document.getElementById("speed").innerHTML = speed.toFixed(2) + " km/h";
    }
}

function toggleMenu() {
    const navbar = document.getElementById("navbar");
    const content = document.querySelector(".content-wrapper");

    if (window.innerWidth > 768) {
        navbar.classList.toggle("hidden");
        if (content) {
            content.classList.toggle("full-width");
        }
    } else {
        navbar.classList.toggle("active");
    }
}
