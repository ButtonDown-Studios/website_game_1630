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



const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
  "https://hammad-sahab.com/django-static/app/assets/1630-theme-music.mp3"
);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration, audio.currentTime
    );
    audio.volume = .75;
  },
  false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
    audio.duration, audio.currentTime
  );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

function getTimeCodeFromNum(totalMusicTime, currentMusicTime) {

  let seconds = parseInt(totalMusicTime - currentMusicTime);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `-${minutes}:${String((seconds % 60)).padStart(2, 0)}`;
  return `-${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}


// modal
function openNewsletterModal() {
    let myModal = new bootstrap.Modal(document.getElementById('newsletterModal'));
    if (localStorage.getItem("isNewsletterModalOpened") !== "1") {
        localStorage.setItem("isNewsletterModalOpened", "1");

        setTimeout(() => {
            myModal.show();
        }, 10000);
    }

}


window.onload = function () {

    openNewsletterModal()

    updateCounter();
};