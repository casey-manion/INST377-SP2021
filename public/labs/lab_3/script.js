/* Put your javascript in here */
function carousel_slider() {
    /* Buttons */
    let nextBtn = document.querySelector('#next');
    let prevBtn = document.querySelector('#prev');

    /* indexing */
    let x = 0;
    let y = 2;

    /* Build images array */
    let images = document.querySelectorAll('.item');
    const imgArr = Array.from(images);

    prevBtn.onclick = (event) => {
        event.preventDefault();

        images[y].classlist.remove("active");

        if (x == 0) {
            x = images.length - 1;
            y--;
        }
        else if (y == 0) {
            y = images.length - 1;
            x--;
        }
        else {
            x--;
            y--;
        }

        images[x].classList.add("active");
    };

    nextBtn.onclick = (event) => {
        event.preventDefault();

        images[x].classList.remove("active");

        if (y >= images.length) {
            y = 0;
            x++;
        }
        else if (x >= images.length) {
            x = 0;
            y++;
        }
        else {
            x++;
            y++;
        }

        images[y].classList.add("active");
    };

}

window.onload = carousel_slider;
