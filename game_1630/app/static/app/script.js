function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function counterTime(datetimeSiteGoesLiveAt) {
    return datetimeSiteGoesLiveAt;
}

function updateCounter() {
    let datetime_site_goes_live_at_value = document.getElementById("datetime_site_goes_live_at").value

    console.log("!!", datetime_site_goes_live_at_value)
    console.log(typeof datetime_site_goes_live_at_value)
    console.warn(moment())
    console.log(new Date(datetime_site_goes_live_at_value))
    console.log(new Date(Date.UTC(datetime_site_goes_live_at_value)))

    // if (datetime_site_goes_live_at_value > datetime_now)
    // {
    //     document.getElementById("days-left").textContent = "constance is greater"
    // }
    // else {
    //     document.getElementById("days-left").textContent = "constance is less"
    // }
    //


}


window.onload = function () {
    updateCounter();
};
