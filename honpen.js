let tick = 0;
let currSchedule = null;

const defaultTime = 30;

const firstMoves = [
  { title: "もも上げ" },
  { title: "かかと上げ" },
  { title: "ひざ出し" },
];

// https://www.nintendo.co.jp/ring/adv/fitskill.html
// const loopMoves = [
//     {title: "スクワット"},
//     {title: "ウシロプッシュ"},
//     {title: "バンザイプッシュ"},
//     {title: "サゲテプッシュ"},
//     {title: "リングアロー"},
//     {title: "カタニプッシュ"},
//     {title: "アームツイスト"},
//     {title: "グルグルアーム"},
//     {title: "バンザイサイドベンド"},
//     {title: "ニートゥーチェスト"},
//     {title: "マエニプッシュ"},
//     {title: "レッグレイズ"},
//     {title: "アシパカパカ"},
//     {title: "スワイショウ"},
//     {title: "バンザイコシフリ"},
//     {title: "リングアゲサゲ"},
//     {title: "ハサミレッグ"},
//     {title: "スクワット"},
//     {title: "ワイドスクワット"},
//     {title: "バンザイスクワット"},
//     {title: "モモアゲアゲ"},
//     {title: "ステップアップ"},
//     {title: "アゲサゲコンボ"},
//     {title: "モモアゲコンボ"},
//     {title: "椅子のポーズ"},
//     {title: "立木のポーズ"},
//     {title: "英雄1のポーズ"},
//     {title: "英雄2のポーズ"},
//     {title: "扇のポーズ"},
// ];
const loopMoves = [
  { title: "ニートゥーチェスト" },
  { title: "ハサミレッグ" },
  { title: "スクワット" },
  { title: "椅子のポーズ" },
  { title: "バンザイスクワット" },
  { title: "アゲサゲコンボ" },
  { title: "マエニプッシュ" },
  { title: "バンザイサイドベンド" },
  { title: "サゲテプッシュ" },
  { title: "アシパカパカ" },
  { title: "リングアゲサゲ" },
  { title: "立木のポーズ" },
  { title: "モモアゲコンボ" },
  { title: "カタニプッシュ" },
  { title: "スクワット" },
  { title: "レッグレイズ" },
  { title: "スワイショウ" },
  { title: "扇のポーズ" },
  { title: "ワイドスクワット" },
  { title: "グルグルアーム" },
  { title: "リングアロー" },
  { title: "アームツイスト" },
  { title: "モモアゲアゲ" },
  { title: "英雄1のポーズ" },
  { title: "バンザイコシフリ" },
  { title: "バンザイプッシュ" },
  { title: "英雄2のポーズ" },
  { title: "ウシロプッシュ" },
  { title: "ステップアップ" },
];

const schedule = [];

function updateTimer(tick) {
  const timeStr = `${Math.floor(tick / 3600).toString()}:${Math.floor(
    (tick / 60) % 60
  )
    .toString()
    .padStart(2, "0")}:${Math.floor(tick % 60)
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("timer").innerText = timeStr;
}

function updateTitle(schedule) {
  document.getElementById("move-title").innerText = schedule.title;
}

function updateRemainingBar(schedule) {
  document.getElementById("remaining-bar-fg").style.width = `${
    (1 - schedule.remaining / schedule.time) * 100
  }%`;
}

function popNextSchedule() {
  if (schedule.length === 0) {
    schedule.push(...loopMoves);
  }
  currSchedule = { time: defaultTime, ...schedule.shift() };
  currSchedule.remaining = currSchedule.time;
  return currSchedule;
}

function incrTick() {
  tick += 1;
  console.log("tick", tick);

  // スケジュールの更新
  currSchedule.remaining--;
  if (currSchedule.remaining <= 0) {
    currSchedule = popNextSchedule();
    document.getElementsByTagName(
      "body"
    )[0].style.background = `linear-gradient(hsl(${
      (Math.random() * 360) | 0
    }, 100%, 25%), hsl(${(Math.random() * 360) | 0}, 100%, 25%))`;
  }

  // 画面更新
  updateTimer(tick);
  updateTitle(currSchedule);
  updateRemainingBar(currSchedule);
}

function main() {
  document.getElementsByTagName(
    "body"
  )[0].style.height = `${window.innerHeight}px`;
  document.getElementById("tap-to-start").addEventListener("click", () => {
    document.getElementById("tap-to-start").style.display = "none";
    console.log("main");
    schedule.push(...firstMoves);
    currSchedule = popNextSchedule();
    setInterval(incrTick, 1000);
  });
}

window.addEventListener("load", main);
