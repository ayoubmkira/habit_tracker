
document.addEventListener('DOMContentLoaded', function() {


    /* Toogle measurable options */
    const measurableSelectElm = document.getElementById("measurable");
    const measurableOptionsElm = document.getElementById("measurable__options");
    const measurableSelectInputsElm = document.querySelectorAll("#measurable__options input");

    const displayMeasurableOptionsElm = (displayIt) => {
        console.log(measurableSelectInputsElm);

        if(displayIt) {
            measurableOptionsElm.style.display = "grid";
            measurableSelectInputsElm.forEach(input => input.disabled = false);
        } else {
            measurableOptionsElm.style.display = "none";
            measurableSelectInputsElm.forEach(input => input.disabled = true);
        }

    };

    displayMeasurableOptionsElm(false);

    measurableSelectElm.addEventListener("change", (e) => {
        const value = e.target.value;
        (value === "true")? displayMeasurableOptionsElm(true): displayMeasurableOptionsElm(false);
    });

});