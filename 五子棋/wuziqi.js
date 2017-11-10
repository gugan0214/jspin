let start = document.querySelector("#start");
let cont = document.querySelector(".container");
let canvas = document.querySelector("canvas");
let sws = canvas.getContext("2d");
let renji = document.querySelector("#aa");
let obj = {};
let bank = {};
let isrenji = false;
renji.onfocus = function () {
    isrenji = true;
}

function j(x, y) {
    return x + "_" + y;
}

start.onclick = function () {
    liebiao.style.display="none";
    cont.classList.add("show");
    cont.style.display = "block";
}

function qipan() {
    sws.clearRect(0, 0, 600, 600);
    sws.beginPath();
    sws.lineWidth = 1;
    for (let i = 0; i < 15; i++) {
        sws.moveTo(20.5 + i * 40, 20);
        sws.lineTo(20.5 + i * 40, 580);
        sws.moveTo(20, 20.5 + i * 40);
        sws.lineTo(580, 20.5 + i * 40);
    }
    sws.stroke();
    dian(3, 3);
    dian(7, 7);
    dian(11, 3);
    dian(3, 11);
    dian(11, 11);

    function dian(x, y) {
        sws.save();
        sws.translate(x * 40 + 20, y * 40 + 20);
        sws.beginPath();
        sws.arc(0, 0, 6, 0, 2 * Math.PI);
        sws.fill();
        sws.restore();
        for (let i = 0; i < 15; i++) {
            for (let k = 0; k < 15; k++) {
                bank[j(i, k)] = true;
            }
        }
    }
}

qipan();

function qizi(x, y, color) {
    sws.save();
    sws.translate(x * 40 + 20, y * 40 + 20);
    sws.fillStyle = color;
    sws.beginPath();
    sws.arc(0, 0, 12, 0, 2 * Math.PI);
    sws.fill();
    sws.restore();
    obj[j(x, y)] = color;
    delete bank[j(x, y)];
}

let flag = true;
let span=document.querySelector("span")
canvas.onclick = function (e) {
    let x = Math.round((e.offsetX - 20) / 40);
    let y = Math.round((e.offsetY - 20) / 40);
    if (obj[j(x, y)]) {
        return;
    }
    if (flag) {
        qizi(x, y, "black");
        if (panduan(x, y, "black") >= 5) {
            zhezhao.style.display="block"
            span.innerHTML="黑棋获胜"
        }
        if (isrenji === true) {
            let p = getPos();
            qizi(p.x, p.y, "white");
            if (panduan(p.x, p.y, "white") >= 5) {
                zhezhao.style.display="block"
                span.innerHTML="白棋获胜"
            }
            return;
        }
    } else {
        qizi(x, y, "white");
        if (panduan(x, y, "white") >= 5) {
            zhezhao.style.display="block"
            span.innerHTML="白棋获胜"
        }
    }
    flag = !flag;
}

function panduan(x, y, color) {
    let hang = 1;
    let i = 1;
    while (obj[j(x + i, y)] === color) {
        hang++;
        i++;
    }
    i = 1;
    while (obj[j(x - i, y)] === color) {
        hang++;
        i++;
    }
    i = 1;
    let lie = 1;
    while (obj[j(x, y + i)] === color) {
        lie++;
        i++;
    }
    i = 1;
    while (obj[j(x, y - i)] === color) {
        lie++;
        i++;
    }
    i = 1;
    let x1 = 1;
    while (obj[j(x + i, y + i)] === color) {
        x1++;
        i++;
    }
    i = 1;
    while (obj[j(x - i, y - i)] === color) {
        x1++;
        i++;
    }
    i = 1;
    let x2 = 1;
    while (obj[j(x - i, y + i)] === color) {
        x2++;
        i++;
    }
    i = 1;
    while (obj[j(x + i, y - i)] === color) {
        x2++;
        i++;
    }
    return Math.max(hang, lie, x1, x2);
}

function getPos() {
    let max1 = 0;
    let pos1 = {};
    for (let i in bank) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let length = panduan(x, y, "black");
        if (length > max1) {
            max1 = length;
            pos1 = {x, y};
        }
    }
    let max2 = 0;
    let pos2 = {};
    for (let i in bank) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let length = panduan(x, y, "white");
        if (length > max2) {
            max2 = length;
            pos2 = {x, y};
        }
    }
    if (max1 > max2) {
        return pos1;
    } else {
        return pos2;
    }
}
let xin=document.querySelector("#xing");
xin.onclick=function () {
    obj={};
    qipan();
}
let zai=document.querySelector("#again")
let zhezhao=document.querySelector(".zhezhao")
zai.onclick=function () {
    zhezhao.style.display="none";
    obj={};
    qipan();
}
let shengcheng=document.querySelector("#qipu")
let box=document.querySelector(".imgbox")
let xiazai=document.querySelector(".imgbox a")
shengcheng.onclick=function () {
    box.style.display="block"
    let url = canvas.toDataURL();
    let newimg = new Image();
    newimg.src = url;
    box.appendChild(newimg);
    xiazai.href = url;
    xiazai.setAttribute("download", "棋谱.png")
}
let moshi=document.querySelector(".moshi")
let liebiao=document.querySelector(".liebiao")
moshi.onclick=function () {
    liebiao.style.display="block";

}

