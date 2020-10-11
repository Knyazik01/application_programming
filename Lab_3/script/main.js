const
    inputSide = document.querySelector('#inputSide'),
    drawButton = document.querySelector('#drawButton'),
    pictureMoon = document.querySelector('.pictureMoon'),
    stopButton = document.querySelector('#stopButton');

let
    drawFlag = true,
    picWidth = pictureMoon.width,
    picHeight = pictureMoon.height,
    oX = picWidth / 2,
    oY = picHeight / 2,
    moonR = Math.min(oX, oY) - 10,
    moonStartAngle = 240,
    moonEndAngle = 150,
    xT = oX + moonR * Math.cos(moonStartAngle / 180 * Math.PI),
    yT = oY + moonR * Math.sin(moonStartAngle / 180 * Math.PI),
    xB = oX + moonR * Math.cos(moonEndAngle / 180 * Math.PI),
    yB = oY + moonR * Math.sin(moonEndAngle / 180 * Math.PI);

// help function
const rewrite = () => {
    picWidth = pictureMoon.width;
    picHeight = pictureMoon.height;
    oX = picWidth / 2;
    oY = picHeight / 2;
    moonR = Math.min(oX, oY) - 10;
    xT = oX + moonR * Math.cos(moonStartAngle / 180 * Math.PI);
    yT = oY + moonR * Math.sin(moonStartAngle / 180 * Math.PI);
    xB = oX + moonR * Math.cos(moonEndAngle / 180 * Math.PI);
    yB = oY + moonR * Math.sin(moonEndAngle / 180 * Math.PI);
};

const genNumFromInterval = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

const genInterval = (count, min, max) => {
    const arr = [];
    for (let i = 0; i < count; ++i) {
        arr.push(genNumFromInterval(min, max));
    }
    return arr;
};

const drawCircle = (context, x, y, r, color, border) => {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI);
    if (color) {
        fillFigure(context, color);
    }
    if (border) context.stroke();
};

const drawRectangle = (context, x, y, w, h, color, border) => {
    context.beginPath();
    context.rect(x, y, w, h);
    if (color) fillFigure(context, color);
    if (border) context.stroke();
};

const drawTriangle = (context, x, y, w, h, color, border) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + w / 2, y + h);
    context.lineTo(x - w / 2, y + h);
    context.lineTo(x, y);
    if (color) fillFigure(context, color);
    if (border) context.stroke();
};

const fillFigure = (context, color) => {
    // context.beginPath();
    context.fillStyle = color;
    context.fill();
    // context.stroke();
}


// Moon
const moonBorder = (context, centerX, centerY, r, startAngle, endAngle, color, border) => {
    context.beginPath();
    // right part
    context.arc(centerX, centerY, r, startAngle / 180 * Math.PI, endAngle / 180 * Math.PI);

    // const xT = oX + r * Math.cos(startAngle / 180 * Math.PI),
    //     yT = oY + r * Math.sin(startAngle / 180 * Math.PI),
    //     xB = oX + r * Math.cos(endAngle / 180 * Math.PI),
    //     yB = oY + r * Math.sin(endAngle / 180 * Math.PI);

    // left part
    // context.moveTo(xT, yT);
    // context.bezierCurveTo(0.6 * oX * 2 + moonR / 1.5, yT, 0.6 * oX * 2 + moonR / 1.5, yB + moonR / 2, xB, yB);
    context.bezierCurveTo(0.6 * oX * 2 + moonR / 1.5, yB + moonR / 2, 0.6 * oX * 2 + moonR / 1.5, yT, xT, yT);

    if (color) fillFigure(context, color);

    if (border) context.stroke();
    ;

    console.log("\u2714 Moon's border has drawn");
};

const moonCraters = (context, count, minR, maxR, color) => {
    for (let i = 0; i < count; ++i) {
        let r = genNumFromInterval(minR, maxR);
        let x = genNumFromInterval(0, picWidth);
        let y = genNumFromInterval(0, picHeight);

        // if not in Moon border - try again
        while (((x - oX) ** 2 + (y - oY) ** 2 > (moonR - r - 10) ** 2) ||
        (((x - 0.7 * oX) / 1.05) ** 2 + ((y - 0.9 * oY) / 0.97) ** 2 < (0.81 * (moonR + r)) ** 2)) {
            x = genNumFromInterval(0, picWidth);
            y = genNumFromInterval(0, picHeight);
        }

        drawCircle(context, x, y, r, color, false);
    }
    console.log("\u2714 Moon's craters have drawn");
};

const drawMoon = (obj, x, y, r, startAngle, endAngle, craterCount, minCraterR, maxCraterR, colorB, colorC) => {
    // if (obj.getContext) {
    //     const canvas = obj.getContext("2d");
    //     obj.beginPath();
    moonBorder(obj, x, y, r, startAngle, endAngle, colorB);

    // obj.beginPath();
    // // right part
    // obj.arc(0.7*oX, 0.9*oY, 0.79*r, 0, 2 * Math.PI);
    // obj.stroke();

    moonCraters(obj, craterCount, minCraterR, maxCraterR, colorC);
    // moonCraters(obj, 100000, minCraterR, maxCraterR); // test border
    // obj.stroke();
    console.log('\u2714 Moon has drawn');
    // }
};

// Stars
const drawStars = (context, count, color) => {
    // count
    for (let i = 0; i < count; ++i) {
        let x = genNumFromInterval(40, picWidth);
        let y = genNumFromInterval(yT, picHeight);
        const r = 0.5;

        while (((x - 0.6 * oX)) ** 2 + ((y - 0.87 * oY) / 0.86) ** 2 > (0.8 * (moonR - r)) ** 2) {
            x = genNumFromInterval(40, picWidth);
            y = genNumFromInterval(yT, picHeight);
        }

        drawCircle(context, x, y, r, color, false);

    }
    console.log("\u2714 Stars have drawn");
};

// Tree
const treeTrunk = (context, color) => {
    drawRectangle(context, 0.56 * oX, 0.67 * oY - 20, picWidth / 40, picHeight / 2, color);
    console.log("\u2714 Tree's trunk has drawn");
};

const treeLeaves = (context, count, width, height, color, border) => {
    // drawRectangle(context, 0.56*oX + picWidth/80, 0.67*oY, width, height);
    // count = 150;
    const qw = 0.93;
    const qh = 0.8;
    // const dh = height/count;
    let w = width;
    let h = height * (qh - 1) / (qh ** count - 1); //
    let x = 0.56 * oX + picWidth / 80;
    let y = 0.67 * oY + height - h;


    // for (let i = 0; i < count; i++) {
    while (y + h > 0.67 * oY - 20) {
        drawTriangle(context, x, y, w, h, color);
        y -= 0.25 * h;
        w *= qw;
        h *= (qh + 0.2);
    }
    console.log("\u2714 Tree's leaves have drawn");
};

const drawTree = (context, count, width, height, colorTrunk, colorLeaves, borderTrunk, borderLeaves) => {
    treeTrunk(context, colorTrunk);
    treeLeaves(context, count, width, height, colorLeaves);
    console.log("\u2714 Tree has drawn");
};

// Camp
// const drawCamp = (obj) => {
//     console.log("\u274C Camp has drawn");
// };

const xOy = (context) => {
    context.beginPath();
    context.moveTo(oX, 0);
    context.lineTo(oX, 2 * oY);
    context.moveTo(0, oY);
    context.lineTo(2 * oX, oY);
    context.stroke();
}

const drawPictureTimeout = (canvas, context) => {
    setTimeout(() => {
        context.clearRect(0, 0, pictureMoon.width, pictureMoon.height);
        drawPicture(canvas);
    }, 500);
}

// Picture
const drawPicture = (canvas) => {
    if (drawFlag) {
        console.log("\u2B6E Start drawing...")
        if (canvas.getContext) {
            const context = canvas.getContext("2d");
            // for dev
            // xOy(context);
            // draw
            drawStars(context, Math.min(picWidth, picHeight), '#F0F8FF');
            drawTree(context, 10, 0.3 * picWidth, 0.4 * picHeight, '#8F5902', '#4E9A06');
            drawMoon(context, oX, oY, moonR, moonStartAngle, moonEndAngle, parseInt(Math.random() * 4 + 8), 3, 0.08 * moonR, '#FFED5A', '#F6CF2C');
            // drawCamp(context);
            console.log('\u2714 Picture has drawn');

            // reDraw picture
            drawPictureTimeout(canvas, context);
        }
    }
};


// document.addEventListener('DOMContentLoaded', () => drawPicture(pictureMoon));
drawButton.addEventListener('click', () => { drawFlag = true; drawPicture(pictureMoon) });

inputSide.addEventListener('input', () => {
        pictureMoon.width = +inputSide.value;
        pictureMoon.height = +inputSide.value;
        pictureMoon.setAttribute("width", `${+inputSide.value}px`);
        pictureMoon.setAttribute("height", `${+inputSide.value}px`);
        rewrite();
        // console.log([inputSide.value]);
    }
);

// not work
stopButton.addEventListener('click', () => {
    drawFlag = false;
});

/*
\u2714 - check
\u274C  - x
*/
