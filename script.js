// Video and progress bar setup
// Console logs are kept for debugging to verify element selection.
const video = document.querySelector('#my-video');
console.log(video);
const progressBarContainer = document.querySelector('#progress-bar-container');
console.log(progressBarContainer);
const progressBar = document.querySelector('#progress-bar');
const stepCards = document.querySelectorAll('.step-card');
console.log(stepCards);

// Update progress bar and highlight active cooking step
// When video plays, highlight which cooking step we are up to.
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

// Click progress bar to jump time.
// Let user click the bar to skip to different parts of the video.
progressBarContainer.addEventListener('click', (e)=>{
    const rect = progressBarContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
})

// Users can jump straight to any cooking stage, matching the non-linear viewing habit of recipe videos.
stepCards.forEach(card => {
    card.addEventListener('click', ()=>{
        const jumpTime = Number(card.dataset.time);
        console.log("Jumping to step time:", jumpTime);
        video.currentTime = jumpTime;
        video.play();
    })
})

// Play / Pause controls
// Reused base player button structure, updated icon swapping to give clear visual feedback for playback state.
const playPauseBtn = document.querySelector('#play-pause-button');
console.log(playPauseBtn);
const playPauseImg = document.querySelector('#play-pause-img');
console.log(playPauseImg);

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

// Mute / Unmute controls
const muteBtn = document.querySelector('#mute-unmute-button');
console.log(muteBtn);
const muteImg = document.querySelector('#mute-unmute-img');
console.log(muteImg);

if (video.muted) {
    muteImg.src = "noaudio.png";
} else {
    muteImg.src = "audio.png";
}

muteBtn.addEventListener('click', ()=>{
    video.muted = !video.muted;
    if(video.muted){
        muteImg.src = "noaudio.png";
    }else{
        muteImg.src = "audio.png";
    }
})

// Fullscreen control
const fullscreenBtn = document.querySelector('#fullscreen-button');
console.log(fullscreenBtn);
// Fullscreen mode lets users clearly view fine details of food preparation.
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

// Page navigation toggle
// Multi-view layout separates video demonstration and written recipe to suit different reading preferences.
const navLinks = document.querySelectorAll('.nav-link');
console.log(navLinks);
const videoWrap = document.querySelector('.media-player');
console.log(videoWrap);
const stepWrap = document.querySelector('.steps-sidebar');
const aboutText = document.querySelector('.about-text');

// Learned event listeners, dataset, classList and inline style modification from MDN Web Docs and YouTube web tutorials.
navLinks.forEach(link => {
    link.addEventListener('click', ()=>{
        const target = link.dataset.target;
        console.log("Nav target selected:", target);
        // reset all
        videoWrap.style.display = "block";
        stepWrap.style.display = "block";
        videoWrap.classList.remove("center-only");
        stepWrap.classList.remove("center-only");
        aboutText.style.display = "none";
        if(target === "home"){
            // both show, side by side
        }else if(target === "recipes"){
            videoWrap.style.display = "none";
            stepWrap.classList.add("center-only");
        }else if(target === "tutorials"){
            stepWrap.style.display = "none";
            videoWrap.classList.add("center-only");
        }else if(target === "about"){
            videoWrap.style.display = "none";
            stepWrap.style.display = "none";
            aboutText.style.display = "block";
        }
    })
})
