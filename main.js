const btn = document.querySelectorAll('.btn');
const resultText = document.querySelector('.resultText');

const user = document.getElementById('user');
const computer = document.getElementById('computer');
const draw = document.getElementById('draw');

const start = document.querySelector('.start');
const timer = document.querySelector('.timer');

const randomImg = document.querySelector('.randomImg');
const imgBox = document.querySelector('.imgbox');

for (let i = 0; i < btn.length; i++) {
  btn[i].disabled = true;
}

let userNum = 0;
let comNum = 0;
let drawNum = 0;


// let rpsArrImg = new Array("paper.png", "rock.png", "scissors.png")
let rpsArrImg = ["paper.png", "rock.png", "scissors.png"]


// let arr = [];

//UI 가위바위보 랜덤 이미지 함수
const rpsImg = () => {
  let imgNum = Math.floor(Math.random() * rpsArrImg.length);
  randomImg.src = `img/${rpsArrImg[imgNum]}`;

  // arr.push(imgNum)
  // let filter = arr.filter((a,b) => {
  //   return arr.indexOf(a) === b;
  // })
  // return filter;
}

rpsImg();

let clear;

function cycle() {
  clear = setInterval(function () {
    rpsImg()
  }, 300);
}

cycle();


for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', () => {

    let result = randomNum();

    calcul(i, result);

    if ((userNum == drawNum && drawNum < comNum) || (userNum < comNum)) {
      resultText.textContent = 'PC Win!!'
    }
    else if ((comNum == drawNum && drawNum < userNum) || (userNum > comNum)) {
      resultText.textContent = 'You Win!!'
    }
    else if ((userNum == drawNum == comNum) || (userNum == comNum)) {
      resultText.textContent = 'Draw!!'
    }
  })
  cycle();
}



//난수생성 함수
const randomNum = () => {
  let num = Math.floor(Math.random() * btn.length); //버튼 길이만큼 랜덤 난수 생성 0~2


  if (num == 0) {
    imgBox.innerHTML = `<img src="img/rock.png" alt="">`;
    return 0

  } else if (num == 1) {
    imgBox.innerHTML = `<img src="img/paper.png" alt="">`;
    return 1
  } else if (num == 2) {
    imgBox.innerHTML = `<img src="img/scissors.png" alt="">`;
    return 2
  }
}


// 1. 주먹(0)-가위(2): 이김
// 2. 주먹(0)-보(1): 짐
// 3. 보(1)-주먹(0): 이김
// 4. 보(1)-가위(2): 짐
// 5. 가위(2)-보(1): 이김
// 6. 가위(2)-주먹(0): 짐
const calcul = (i, result) => { //가위바위보 메인 계산 함수

  let cha = i - result;

  if (i == result) { //무승부
    drawNum++;
    draw.textContent = `${drawNum}`;
    return drawNum
  }
  else if (cha == -2 || cha == 1) { //사용자 승리
    userNum++;
    user.textContent = `${userNum}`;
    return userNum
  }
  else if (cha == -1 || cha == 2) { //컴퓨터 승리
    comNum++;
    computer.textContent = `${comNum}`;
    return comNum
  }
}


//시작버튼
let countTime = 30;
start.addEventListener('click', () => {
  start.disabled = true; //시작버튼 활성화
  for (let i = 0; i < btn.length; i++) {
    btn[i].disabled = false; //버튼 활성화
  }
  start.innerHTML = '<img src="img/pixel3.png">';
  start.style.cursor = 'no-drop';

  userNum = 0; comNum = 0; drawNum = 0; //변수 초기화
  user.textContent = userNum;
  computer.textContent = comNum;
  draw.textContent = drawNum;

  timerSet();
})


//타이머 함수
const timerSet = () => {
  let count = setInterval(function () {

    timer.textContent = ` ${--countTime}`; //숫자감소

    if (countTime <= 0) {
      clearInterval(count);
      countTime = 30;
      start.disabled = false;
      for (let i = 0; i < btn.length; i++) {
        btn[i].disabled = true;
      }


      start.innerHTML = '<img src="img/pixel4.png">';
      setTimeout(function () {
        start.innerHTML = '<img src="img/pixel2.png">';
        start.style.cursor = 'pointer';
      }, 500)

    }
  }, 1000);
}