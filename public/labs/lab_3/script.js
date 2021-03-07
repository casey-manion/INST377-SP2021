/* Put your javascript in here */
function carousel_slider() {
    /* Buttons */
    let nextBtn = document.querySelector('#next');
    let prevBtn = document.querySelector('#prev');

    /* indexing */
    let l_idx = 0;
    let m_idx = 1;
    let r_idx = 2;

    /* Build images array */
    let images = document.querySelectorAll('.item');

    // previous button click functionality
    prevBtn.onclick = (event) => {
        event.preventDefault();

        // remove current images class, add hidden to image that is leaving 
        images[l_idx].classList.remove("left")
        images[m_idx].classList.remove("middle")
        images[r_idx].classList.remove("right")
        images[r_idx].classList.add("hidden")

        // update indexes
        if (l_idx == 0) {
            r_idx = m_idx;
            m_idx = l_idx;
            l_idx = images.length - 1;
        }
        else {
            r_idx = m_idx;
            m_idx = l_idx;
            l_idx--;
        }

        // add appropriate class based on updated indexes, remove
        // hidden from image entering carousel and add appropriate class
        images[r_idx].classList.add("right")
        images[m_idx].classList.add("middle")
        images[l_idx].classList.remove("hidden")
        images[l_idx].classList.add("left")

    };

    // next button click functionality
    nextBtn.onclick = (event) => {
        event.preventDefault();

        // remove current images class, add hidden to image that is leaving 
        images[l_idx].classList.remove("left")
        images[m_idx].classList.remove("middle")
        images[r_idx].classList.remove("right")
        images[l_idx].classList.add("hidden")

        // update indexes
        if (r_idx == images.length - 1) {
            l_idx = m_idx;
            m_idx = r_idx;
            r_idx = 0;
        }
        else {
            l_idx = m_idx;
            m_idx = r_idx;
            r_idx++;
        }

        // add appropriate class based on updated indexes, remove
        // hidden from image entering carousel and add appropriate class
        images[l_idx].classList.add("left")
        images[m_idx].classList.add("middle")
        images[r_idx].classList.remove("hidden")
        images[r_idx].classList.add("right")
    };

}

window.onload = carousel_slider;