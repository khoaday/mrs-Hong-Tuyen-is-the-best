const baseImg = new Image()
baseImg.src = './image/womenday.jpeg'

let isLoad = false

let myFont = new FontFace(
    "myFont",
    "url(./font/AlexBrush-Regular.ttf)"
);

let Pacifico = new FontFace(
    "myFont-2",
    "url(./font/Pacifico-Regular.ttf)"
);

myFont.load().then((font) => {
    document.fonts.add(font);
    resize()
})
Pacifico.load().then((font) => {
    document.fonts.add(font);
    resize()
})

const search = new URLSearchParams(window.location.search)

function resize() {

    let receive = search.get('receive') ?? ""
    let description = search.get('description') ?? ""

    receive = decodeURI(receive)
    description = decodeURI(description)

    const canvas = document.querySelector('.canvas')

    canvas.width = window.innerWidth - 15
    canvas.height = window.innerHeight

    if (canvas.width < 768) {
        canvas.width = 1366
        canvas.height = 768
    }

    const ctx = canvas.getContext('2d')

    function drawText(text, x, y, maxWidth, lineHeight) {
        let words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        ctx.fillText(line, x, y);
    }


    function render() {
        const scaleFactor = canvas.width / baseImg.width

        canvas.height = baseImg.height * scaleFactor

        ctx.drawImage(baseImg, canvas.width - (baseImg.width * scaleFactor), 0, baseImg.width * scaleFactor, baseImg.height * scaleFactor)

        ctx.font = "48px Alex Brush"

        ctx.fillText(receive, canvas.width - (baseImg.width * scaleFactor) / 2 - ctx.measureText(receive).width / 2, canvas.height - 50);

        ctx.font = "28px Pacifico"
        ctx.fillStyle = "#E94B62"

        drawText(description, 10, baseImg.height * scaleFactor / 2, baseImg.width * scaleFactor / 2 - 600 * scaleFactor, 48)
    }

    if (isLoad) render()
    else {
        baseImg.onload = () => {
            isLoad = true
            render()
        }
        isLoad = true
    }
}

window.addEventListener('DOMContentLoaded', () => {
    resize()
})

function clickEvent() {

    const textHref = document.querySelector('.textHref')
    textHref.classList.add('show')

    const canvas = document.querySelector('.canvas')
    canvas.classList.add('show')

    resize()
}

document.onclick = () => {
    const musicAudio = document.querySelector("#musicAudio")

    const music = Number(decodeURI(search.get('music')))

    if (musicAudio.paused && music && music > 0 && music <= 3) {
        musicAudio.src = `./music/${music}.mp3`
        musicAudio.play()
    }

    document.onclick = undefined
}

window.onresize = () => {
    resize()
}