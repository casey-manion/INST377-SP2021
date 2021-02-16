/* Put your javascript in here */
function carousel_slider() {
    /* Buttons */
    let nextBtn = document.querySelector('#next');
    let prevBtn = document.querySelector('#prev');

    /* indexing */
    let l_idx = 0;
    let c_idx = 1;
    let r_idx = 2;

    /* Build images array */
    let images = document.querySelectorAll('.item');
    // const imgArr = Array.from(images);

    prevBtn.onclick = (event) => {
        event.preventDefault();

        images[r_idx].classList.remove("active");

        if (l_idx == 0) {
            r_idx = c_idx;
            c_idx = l_idx;
            l_idx = images.length - 1;
        }
        else {
            r_idx = c_idx;
            c_idx = l_idx;
            l_idx--;
        }

        images[l_idx].classList.add("active");
    };

    nextBtn.onclick = (event) => {
        event.preventDefault();

        images[l_idx].classList.remove("active");

        if (r_idx == images.length) {
            l_idx = c_idx;
            c_idx = r_idx;
            r_idx = 0;
        }
        else {
            l_idx = c_idx;
            c_idx = r_idx;
            r_idx++;
        }

        images[r_idx].classList.add("active");
    };

}

window.onload = carousel_slider;