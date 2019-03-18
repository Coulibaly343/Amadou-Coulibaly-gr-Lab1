document.addEventListener("DOMContentLoaded", start);
document.addEventListener('keypress', graj);

let crashCymbal, crashCymbalAll;
let hiHatUp, hiHatDown, hiHatAll; //instrumenty svg
let tom1, tom2, floorTom;
let snareDrum, bassDrum;
let sciezka1 = [],
    sciezka2 = [], //ścieżki do odgrywania
    sciezka3 = [],
    sciezka4 = [];
let sciezkaTemp = [],
    sciezkaTemp2 = [],
    sciezkaTemp3 = [], //ścieżki odgrywane są przerzucane na tmp, które potem znów oddają ścieżkę do oryginalnej
    sciezkaTemp4 = [];
let startTime; //rozpoczęcie nagrywania ścieżki
let lastTime; //czas ostatniego kliknięcia w przycisk przy nagrywaniu
let sound; //wybieramy dźwięk do odtworzenia
let time;  //czas rozpoczęcia kliknięcia przycisku na klawiaturze
let musicPressed = false, //czy gramy coś
    recordBtnPressed = false; //czy nagrywamy
let trackBtn, trackBtn2, trackBtn3, trackBtn4; //ścieżki
let recordBtn, recordBtn2, recordBtn3, recordBtn4; //nagrywające przyciski
let checkBtn, checkBtn2, checkBtn3, checkBtn4; //wybierające przyciski, które ścieżki odtwarzamy
let przycisk; //którą ścieżkę obecnie nagrywamy
let btn; //którą obecnie odtwarzamy
let playBtn; //przycisk włączenia wszystkich wybranych ścieżek
let clearAllBtn; //przycisk wyczyszczenia wszystkich ścieżek
let btnPressed = false;
let value; //do wybrania nazwy ścieżki,którą włączamy

function start() {
    let przyciskiii = document.querySelectorAll('.cleared') //clear btns
    przyciskiii.forEach(
        function (przycisk) {
            przycisk.addEventListener('click', clearTrack)
        }
    )
    let przyciskii = document.querySelectorAll('.track') //ścieżki dźwiękowe
    przyciskii.forEach(
        function (przycisk) {
            przycisk.addEventListener("click", odtworzSciezke)
            przycisk.addEventListener("click", recordBtninnerHTML)
        }
    )
    let przyciski = document.querySelectorAll('.rec') // nagrywanie
    przyciski.forEach(
        function (przycisk) {
            przycisk.addEventListener("click", recordMusic)
        }
    )
    let checks = document.querySelectorAll(".checked")
    checks.forEach(
        function (el) {
            el.disabled = true;
        })
    //record buttons
    recordBtn = document.getElementById("record")
    recordBtn2 = document.getElementById("record2")
    recordBtn3 = document.getElementById("record3")
    recordBtn4 = document.getElementById("record4")
    //track buttons
    trackBtn = document.getElementById("play")
    trackBtn2 = document.getElementById("play2")
    trackBtn3 = document.getElementById("play3")
    trackBtn4 = document.getElementById("play4")
    //big play btn
    playBtn = document.getElementById("playBig")
    playBtn.addEventListener("click", playMusicAll)
    //clear all btn
    clearAllBtn = document.getElementById("clearAll")
    clearAllBtn.addEventListener("click", clearAll)
    //checkbox btns
    checkBtn = document.getElementById("check")
    checkBtn2 = document.getElementById("check2")
    checkBtn3 = document.getElementById("check3")
    checkBtn4 = document.getElementById("check4")
    //crash vars
    crashCymbalAll = document.getElementById("crash_cymbal")
    crashCymbal = document.getElementById("crash")
    crashCymbalAll.addEventListener("click", crashAnim)
    //hi-hat vars
    hiHatUp = document.getElementById("hi_hat_upper")
    hiHatDown = document.getElementById("hi_hat_down")
    hiHatAll = document.getElementById("hi_hat_cymbal")
    hiHatAll.addEventListener("click", hihatAnim)
    //tom1 vars
    tom1 = document.getElementById("tom_1")
    tom1All = document.getElementById("tom_1All")
    tom1.addEventListener("click", tom1Anim)
    //tom2 vars
    tom2 = document.getElementById("tom_2")
    tom2All = document.getElementById("tom_2All")
    tom2.addEventListener("click", tom2Anim)
    //floor tom vars
    floorTom = document.getElementById("foot_tom")
    floorTom.addEventListener("click", FloorAnim)
    //bass drum vars
    bassDrum = document.getElementById("bass_drum")
    bassDrum.addEventListener("click", bassAnim)
    //snare drum vars
    snareDrum = document.getElementById("snare_drum")
    snareDrum.addEventListener("click", snareAnim)
}

function graj(e) {
    if (event.getModifierState("CapsLock") == false) {
        switch (e.keyCode) {
            case 106:
                hihatAnim();
                sound = document.querySelector('audio[data-key="106"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 104:
                snareAnim();
                sound = document.querySelector('audio[data-key="104"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 98:
                bassAnim();
                sound = document.querySelector('audio[data-key="98"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 103:
                FloorAnim();
                sound = document.querySelector('audio[data-key="103"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 102:
                crashAnim();
                sound = document.querySelector('audio[data-key="102"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 116:
                tom1Anim();
                sound = document.querySelector('audio[data-key="116"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            case 121:
                tom2Anim();
                sound = document.querySelector('audio[data-key="121"]')
                sound.currentTime = 0;
                time = Date.now();
                sound.play();
                musicPressed = true;
                break;
            default:
                {
                    break;
                }
        }
        if (recordBtnPressed == true && musicPressed == true) {
            let timer = Date.now()
            let btn = e.target;
            switch (btn.id) {
                case "record":
                    sciezka1.push({
                        time: timer - lastTime,
                        btn: e.keyCode
                    });
                    break;
                case "record2":
                    sciezka2.push({
                        time: timer - lastTime,
                        btn: e.keyCode
                    });
                    break;
                case "record3":
                    sciezka3.push({
                        time: timer - lastTime,
                        btn: e.keyCode
                    });
                    break;
                case "record4":
                    sciezka4.push({
                        time: timer - lastTime,
                        btn: e.keyCode
                    });
                    break;
            }
            musicPressed = false;
            lastTime = timer;
        }
    } else {
    }
}

function playMusicAll(e) {
    let sciezkaTempo = [sciezka1, sciezka2, sciezka3, sciezka4]
    value = 1;
    let functionName;
    sciezkaTempo.forEach(
        function (element) {
            let checkbox = document.querySelector(`input[data-value="${value}"]`)
            if (element.length != 0 && checkbox.checked == true) {
                console.log(element)
                functionName = `playing${value}`
                let func = window[functionName];
                func();
                console.log(func)
            }
            if (value < 4) {
                value++;
            }
        }
    )
}

function recordMusic(e) {
    przycisk = e.target;
    if (recordBtnPressed == false) {
        startTime = lastTime = Date.now()
        recordBtnPressed = true;
        przycisk.innerHTML = "Zatrzymaj";
        switch (przycisk.id) {
            case "record":
                recordBtn2.disabled = true;
                recordBtn3.disabled = true;
                recordBtn4.disabled = true;
                trackBtn2.disabled = true;
                trackBtn3.disabled = true;
                trackBtn4.disabled = true;
                break;
            case "record2":
                recordBtn.disabled = true;
                recordBtn3.disabled = true;
                recordBtn4.disabled = true;
                trackBtn.disabled = true;
                trackBtn3.disabled = true;
                trackBtn4.disabled = true;
                break;
            case "record3":
                recordBtn2.disabled = true;
                recordBtn.disabled = true;
                recordBtn4.disabled = true;
                trackBtn2.disabled = true;
                trackBtn.disabled = true;
                trackBtn4.disabled = true;
                break;
            case "record4":
                recordBtn2.disabled = true;
                recordBtn3.disabled = true;
                recordBtn.disabled = true;
                trackBtn2.disabled = true;
                trackBtn3.disabled = true;
                trackBtn.disabled = true;
                break;
        }
    } else {
        changeTrackStyle();
        recordBtnPressed = false;
        przycisk.innerHTML = "Nagrywaj"
        recEn();
        trackEn();
    }
}

function recordBtninnerHTML() {
    if (przycisk) {
        if (przycisk.innerHTML == "Zatrzymaj") {
            przycisk.innerHTML = "Nagrywaj"
        }
    }
}

function odtworzSciezke(e) {
    if (przycisk) {
        changeTrackStyle();
        if (btn == undefined) {
            btn = e.target;
        }
        let el;
        console.log("btn id: " + btn.id)
        switch (btn.id) {
            case "play":
                el = sciezka1.shift();
                if (el) {
                    sciezkaTemp.push(el);
                }
                trackDis();
                recDis();
                break;
            case "play2":
                el = sciezka2.shift();
                if (el) {
                    sciezkaTemp2.push(el);
                }
                trackDis();
                recDis();
                break;
            case "play3":
                el = sciezka3.shift();
                if (el) {
                    sciezkaTemp3.push(el);
                }
                trackDis();
                recDis();
                break;
            case "play4":
                el = sciezka4.shift();
                if (el) {
                    sciezkaTemp4.push(el);
                }
                trackDis();
                recDis();
                break;
        }
        if (el) {
            setTimeout(() => {
                if (el) {
                    let sound = document.querySelector(`audio[data-key="${el.btn}"]`)
                    switch (el.btn) {
                        case 106:
                            hihatAnim();
                            break;
                        case 104:
                            snareAnim();
                            break;
                        case 98:
                            bassAnim();
                            break;
                        case 103:
                            FloorAnim();
                            break;
                        case 102:
                            crashAnim();
                            break;
                        case 116:
                            tom1Anim();
                            break;
                        case 121:
                            tom2Anim();
                            break;
                    }
                    sound.currentTime = 0
                    sound.play()
                }
            }, el.time)
            setTimeout(odtworzSciezke, el.time)
        }
        if (!el) {
            switch (btn.id) {
                case "play":
                    sciezka1 = sciezkaTemp
                    break;
                case "play2":
                    sciezka2 = sciezkaTemp2
                    break;
                case "play3":
                    sciezka3 = sciezkaTemp3
                    break;
                case "play4":
                    sciezka4 = sciezkaTemp4
                    break;
            }
            sciezkaTemp = []
            sciezkaTemp2 = []
            sciezkaTemp3 = []
            sciezkaTemp4 = []
            recEn();
            trackEn();
            btn = undefined;
            recordBtnPressed = false;
        }
    }
}

function playing1() {
    if (przycisk) {
        let el;
        el = sciezka1.shift();
        if (el) {
            sciezkaTemp.push(el);
            console.log(sciezkaTemp)
        }
        if (el) {
            setTimeout(() => {
                if (el) {
                    let sound = document.querySelector(`audio[data-key="${el.btn}"]`)
                    switch (el.btn) {
                        case 106:
                            hihatAnim();
                            break;
                        case 104:
                            snareAnim();
                            break;
                        case 98:
                            bassAnim();
                            break;
                        case 103:
                            FloorAnim();
                            break;
                        case 102:
                            crashAnim();
                            break;
                        case 116:
                            tom1Anim();
                            break;
                        case 121:
                            tom2Anim();
                            break;
                    }
                    sound.currentTime = 0
                    sound.play()
                }
            }, el.time)
            setTimeout(playing1, el.time)
        }
        if (!el) {
            sciezka1 = sciezkaTemp

            sciezkaTemp = []
            recordBtnPressed = false;
        }
    }
}

function playing2() {
    if (przycisk) {
        let el;
        el = sciezka2.shift();
        if (el) {
            sciezkaTemp2.push(el);
        }

        if (el) {
            setTimeout(() => {
                if (el) {
                    let sound = document.querySelector(`audio[data-key="${el.btn}"]`)
                    switch (el.btn) {
                        case 106:
                            hihatAnim();
                            break;
                        case 104:
                            snareAnim();
                            break;
                        case 98:
                            bassAnim();
                            break;
                        case 103:
                            FloorAnim();
                            break;
                        case 102:
                            crashAnim();
                            break;
                        case 116:
                            tom1Anim();
                            break;
                        case 121:
                            tom2Anim();
                            break;
                    }
                    sound.currentTime = 0
                    sound.play()
                }
            }, el.time)
            setTimeout(playing2, el.time)
        }
        if (!el) {
            sciezka2 = sciezkaTemp2

            sciezkaTemp2 = []
            recordBtnPressed = false;
        }
    }
}

function playing3() {
    if (przycisk) {
        let el;
        el = sciezka3.shift();
        if (el) {
            sciezkaTemp3.push(el);
        }

        if (el) {
            setTimeout(() => {
                if (el) {
                    let sound = document.querySelector(`audio[data-key="${el.btn}"]`)
                    switch (el.btn) {
                        case 106:
                            hihatAnim();
                            break;
                        case 104:
                            snareAnim();
                            break;
                        case 98:
                            bassAnim();
                            break;
                        case 103:
                            FloorAnim();
                            break;
                        case 102:
                            crashAnim();
                            break;
                        case 116:
                            tom1Anim();
                            break;
                        case 121:
                            tom2Anim();
                            break;
                    }
                    sound.currentTime = 0
                    sound.play()
                }
            }, el.time)
            setTimeout(playing3, el.time)
        }
        if (!el) {
            sciezka3 = sciezkaTemp3
            sciezkaTemp3 = [];
            recordBtnPressed = false;
        }
    }
}

function playing4() {
    if (przycisk) {
        let el;
        el = sciezka4.shift();
        if (el) {
            sciezkaTemp4.push(el);

            setTimeout(() => {
                if (el) {
                    let sound = document.querySelector(`audio[data-key="${el.btn}"]`)
                    switch (el.btn) {
                        case 106:
                            hihatAnim();
                            break;
                        case 104:
                            snareAnim();
                            break;
                        case 98:
                            bassAnim();
                            break;
                        case 103:
                            FloorAnim();
                            break;
                        case 102:
                            crashAnim();
                            break;
                        case 116:
                            tom1Anim();
                            break;
                        case 121:
                            tom2Anim();
                            break;
                    }
                    sound.currentTime = 0
                    sound.play()
                }
            }, el.time)
            setTimeout(playing4, el.time)
        }
        if (!el) {
            sciezka4 = sciezkaTemp4

            sciezkaTemp4 = []
            recordBtnPressed = false;
        }
    }
}

function clearTrack(e) {
    if (przycisk) {
        let btn;
        if (btnPressed == false) {
            btn = e.target;
        } else {
            btn = e;
        }
        switch (btn.id) {
            case "clear":
                sciezka1 = []
                sciezkaTemp = []
                trackBtn.style.backgroundColor = "#007bff"
                checkBtn.disabled = true;
                checkBtn.checked = false;
                break;
            case "clear2":
                sciezka2 = []
                sciezkaTemp2 = []
                trackBtn2.style.backgroundColor = "#007bff"
                checkBtn2.disabled = true;
                checkBtn2.checked = false;
                break;
            case "clear3":
                sciezka3 = []
                sciezkaTemp3 = []
                trackBtn3.style.backgroundColor = "#007bff"
                checkBtn3.disabled = true;
                checkBtn3.checked = false;
                break;
            case "clear4":
                sciezka4 = []
                sciezkaTemp4 = []
                trackBtn4.style.backgroundColor = "#007bff"
                checkBtn4.disabled = true;
                checkBtn4.checked = false;
                break;
        }
        recordBtnPressed = false;
        przycisk.innerHTML = "Nagrywaj"
        trackEn();
        recEn();
    }
}

function trackDis() {
    trackBtn.disabled = true;
    trackBtn2.disabled = true;
    trackBtn3.disabled = true;
    trackBtn4.disabled = true;
}

function trackEn() {
    trackBtn.disabled = false;
    trackBtn2.disabled = false;
    trackBtn3.disabled = false;
    trackBtn4.disabled = false;
}

function recDis() {
    recordBtn.disabled = true;
    recordBtn2.disabled = true;
    recordBtn3.disabled = true;
    recordBtn4.disabled = true;
}

function recEn() {
    recordBtn.disabled = false;
    recordBtn2.disabled = false;
    recordBtn3.disabled = false;
    recordBtn4.disabled = false;
}

function changeTrackStyle() {
    switch (przycisk.id) {
        case "record":
            if (sciezka1.length != 0) {
                trackBtn.style.backgroundColor = "#2abbd8"
                checkBtn.disabled = false;
                checkBtn.checked = true;
            }
            break;
        case "record2":
            if (sciezka2.length != 0) {
                trackBtn2.style.backgroundColor = "#2abbd8"
                checkBtn2.disabled = false;
                checkBtn2.checked = true;
            }
            break;
        case "record3":
            if (sciezka3.length != 0) {
                trackBtn3.style.backgroundColor = "#2abbd8"
                checkBtn3.disabled = false;
                checkBtn3.checked = true;
            }
            break;
        case "record4":
            if (sciezka4.length != 0) {
                trackBtn4.style.backgroundColor = "#2abbd8"
                checkBtn4.disabled = false;
                checkBtn4.checked = true;
            }
            break;
    }
}

function clearAll() {
    btnPressed = true;
    let przyciski = document.querySelectorAll('.cleared')
    przyciski.forEach(
        function (e) {
            clearTrack(e);
        }
    )
    btnPressed = false;
}

function crashAnim() {
    let crashTL = new TimelineMax(
        paused = true
    );
    crashTL.to(crashCymbal, 0.1, {
            rotation: 8,
            transformOrigin: "50% 50%"
        })
        .to(crashCymbal, 1.5, {
            rotation: 0,
            transformOrigin: "50% 50%",
            ease: Elastic.easeOut.config(2.5, 0.3)
        });

    let sound = document.querySelector('audio[data-key="102"]')
    sound.currentTime = 0;
    sound.play();
}

function hihatAnim() {
    let hihatTL = new TimelineMax(
        paused = true
    );
    hihatTL.to([hiHatUp, hiHatDown], 0.1, {
            rotation: -4,
            transformOrigin: "50% 50%"
        })
        .to([hiHatUp, hiHatDown], 0.6, {
            rotation: 0,
            transformOrigin: "50% 50%",
            ease: Elastic.easeOut.config(1.5, 0.2)
        });

    let sound = document.querySelector('audio[data-key="106"]')
    sound.currentTime = 0;
    sound.play();
}

function tom1Anim() {
    let tom1TL = new TimelineMax(
        paused = true
    );
    tom1TL.to(tom1, 0.1, {
            scaleX: 0.25,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        })
        .to(tom1, 0.1, {
            scaleY: 0.2,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        }, '0')
        .to(tom1All, 0.1, {
            rotation: -2.5,
            transformOrigin: "100% 50%",
            ease: Elastic.easeOut
        }, '0')
        .to(tom1, 0.4, {
            scale: 0.265,
            transformOrigin: "50% 50%",
            ease: Elastic.easeOut
        })
        .to(tom1All, 0.6, {
            rotation: 0,
            transformOrigin: "100% 50%",
            ease: Elastic.easeOut
        }, '-=0.4');

    let sound = document.querySelector('audio[data-key="116"]')
    sound.currentTime = 0;
    sound.play();
}

function tom2Anim() {
    let tom2TL = new TimelineMax(
        paused = true
    );
    tom2TL.to(tom2, 0.1, {
            scaleX: 0.25,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        })
        .to(tom2, 0.1, {
            scaleY: 0.2,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        }, '0')
        .to(tom2All, 0.1, {
            rotation: -2.5,
            transformOrigin: "0 50%",
            ease: Elastic.easeOut
        }, '0')
        .to(tom2, 0.4, {
            scale: 0.265,
            transformOrigin: "50% 50%",
            ease: Elastic.easeOut
        })
        .to(tom2All, 0.6, {
            rotation: 0,
            transformOrigin: "0 50%",
            ease: Elastic.easeOut
        }, '-=0.4');

    let sound = document.querySelector('audio[data-key="121"]')
    sound.currentTime = 0;
    sound.play();
}

function FloorAnim() {
    let floorTomTL = new TimelineMax(
        paused = true
    );
    floorTomTL.to(floorTom, 0.1, {
            scaleX: 1.02,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        })
        .to(floorTom, 0.1, {
            scaleY: 0.95,
            transformOrigin: "50% 100%",
            ease: Expo.easeOut
        }, '0')
        .to(floorTom, 0.4, {
            scale: 1,
            transformOrigin: "50% 100%",
            ease: Elastic.easeOut
        });

    let sound = document.querySelector('audio[data-key="103"]')
    sound.currentTime = 0;
    sound.play();
}

function bassAnim() {
    let bassDrumTL = new TimelineMax(
        paused = true
    );
    bassDrumTL.to(bassDrum, 0.1, {
            scale: 1.02,
            transformOrigin: "50% 100%",
            ease: Expo.easeOut
        })
        .to(bassDrum, 0.4, {
            scale: 1,
            transformOrigin: "50% 100%",
            ease: Elastic.easeOut
        });

    let sound = document.querySelector('audio[data-key="98"]')
    sound.currentTime = 0;
    sound.play();
}

function snareAnim() {
    let snareDrumTL = new TimelineMax(
        paused = true
    );
    snareDrumTL.to(snareDrum, 0.1, {
            scaleX: 1.04,
            transformOrigin: "50% 50%",
            ease: Expo.easeOut
        })
        .to(snareDrum, 0.1, {
            scaleY: 0.9,
            transformOrigin: "50% 100%",
            ease: Expo.easeOut
        }, '0')
        .to(snareDrum, 0.4, {
            scale: 1,
            transformOrigin: "50% 100%",
            ease: Elastic.easeOut
        });

    let sound = document.querySelector('audio[data-key="104"]')
    sound.currentTime = 0;
    sound.play();
}