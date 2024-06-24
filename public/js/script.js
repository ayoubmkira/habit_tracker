
document.addEventListener('DOMContentLoaded', function() {

    const measurableSelectElm = document.getElementById("measurable");
    const measurableOptionsElm = document.getElementById("measurable__options");

    const displayMeasurableOptionsElm = (displayIt) => {
        displayIt?
            measurableOptionsElm.style.display = "grid":
            measurableOptionsElm.style.display = "none";
    };

    displayMeasurableOptionsElm(false);

    measurableSelectElm.addEventListener("change", (e) => {
        const value = e.target.value;
        (value === "true")? displayMeasurableOptionsElm(true): displayMeasurableOptionsElm(false);
    });

});