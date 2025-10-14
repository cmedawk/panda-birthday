const video = document.getElementById('introVideo')
const envelope = document.getElementById('envelope')
const card = document.getElementById('card')

//termina el video
video.addEventListener('ended', ()=>{
    video.style.display = 'none'    //oculta el video
    envelope.parentElement.style.display = 'block'    //mostar sobre
    card.style.display = 'block'
})

//click en el sobre
envelope.addEventListener('click', ()=>{
    envelope.classList.add('open')
    card.classList.add('show')
})