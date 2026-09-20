const video = document.querySelector('#my-video');
const playPauseBtn = document.querySelector('#play-pause-button');
const playPauseImg = document.querySelector('#play-pause-img');
const muteBtn = document.querySelector('#mute-unmute-button');
const muteImg = document.querySelector('#mute-unmute-img');
const fullscreenBtn = document.querySelector('#fullscreen-button');
const progressBarContainer = document.querySelector('#progress-bar-container');
const progressBar = document.querySelector('#progress-bar');
const stepCards = document.querySelectorAll('.step-card');
if (video.muted) {
    muteImg.src = "noaudio.png";
} else {
    muteImg.src = "audio.png";
}

// Play / Pause
playPauseBtn.addEventListener('click', ()=>{
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
});

// Change play/pause icon
video.addEventListener('play', ()=>{
    playPauseImg.src = "pause.png";
})
video.addEventListener('pause', ()=>{
    playPauseImg.src = "play.png";
})

// Mute / Unmute
muteBtn.addEventListener('click', ()=>{
    video.muted = !video.muted;
    if(video.muted){
        muteImg.src = "noaudio.png";
    }else{
        muteImg.src = "audio.png";
    }
})


// Fullscreen
fullscreenBtn.addEventListener('click', async ()=>{
    try {
        if(!document.fullscreenElement){
            await video.requestFullscreen();
        }else{
            await document.exitFullscreen();
        }
    }catch(err){
        console.log('Fullscreen error', err);
    }
})

// Progress bar update
video.addEventListener('timeupdate', ()=>{
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percent + "%";

    // Auto highlight active step card
    stepCards.forEach(card => {
        const stepTime = Number(card.dataset.time);
        if(video.currentTime >= stepTime){
            card.classList.add('active');
        }else{
            card.classList.remove('active');
        }
    })
})

// Click progress bar to jump time
progressBarContainer.addEventListener('click', (e)=>{
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
})

// Click step card to jump video time
stepCards.forEach(card => {
    card.addEventListener('click', ()=>{
        const jumpTime = Number(card.dataset.time);
        video.currentTime = jumpTime;
        video.play();
    })
})
