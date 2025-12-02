
function onSongleAPIReady(Songle) {

  // 音楽プレーヤーを表示する
  var player = new Songle.Player({
    mediaElement: document.querySelector('div.media'),
    accessToken: '00000144-8PDPBsb', // 参加用トークン
     secretToken: '5ruktp2XZhuB1rKBLhUTkTdq6b46bHDb'  // 認証用トークン
	
  });

  player.addPlugin(new Songle.Plugin.SongleSync({
	  enabled: true,    // 新しく接続を開始
  clientId: "unique-" + Date.now()
  }));

  player.useMedia('https://youtu.be/9HKbo1FstOE?si=zpkfS8K7KCzAvCQu');


//ビート
player.addPlugin(new Songle.Plugin.Beat());

/*
player.on("beatEnter",
  function(ev) {
    // 処理 ...
	document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",90%,60%)";
	
  });*/

//メロディ
player.addPlugin(new Songle.Plugin.Melody());
player.on("melodyEnter",
  function(ev) {
    // do someting ...
	//document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",100%,60%)";
  });

//和音
player.addPlugin(new Songle.Plugin.Chord());

player.on("chordEnter",
  function(ev) {
    // do someting ...
	//document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",90%,60%)";
  });


	// 和音の種類に応じた色相（Hue）
function getHue(chordType) {
  switch (chordType) {
    case "M": return 60;      // Major → 黄色寄り
    case "m": return 240;     // Minor → 青
    case "sus": return 120;   // Sus → 緑
    case "dim": return 280;   // Dim → 紫
    case "7": return 350;     // 7th → 赤寄り
    default: return 0;        // fallback
  }
}

// 緊張度 → 明度(V)計算 (0〜1)
function getValue(tension) {
  return Math.max(0, Math.min(1, 0.8 - 0.1 * tension));
}

// Key → 彩度(S)計算 (0〜1)
function getSaturation(key) {
  return 0.6 + 0.03 * key;  // key=0〜11
}

// HSV → RGB変換
function hsvToRgb(h, s, v) {
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}




  // ページが読み込まれたら再生を開始する
  player.on('mediaReady', function () {
    player.play();
  });

  // 再生ボタンで再生を開始する
  var playButton = document.querySelector('button.play');
  playButton.addEventListener('click', function () {
    player.play();
  });

//先頭
  var seekToButton = document.querySelector('button.seekTo');
  seekToButton.addEventListener('click', function () {
    player.seekTo(0);
  });
//サビ


  // 停止ボタンで再生を停止する
  var pauseButton = document.querySelector('button.pause');
  pauseButton.addEventListener('click', function () {
    player.pause();
  });

//ビート・コード　プラグイン
player.addPlugin(new Songle.Plugin.Beat());
player.on("beatEnter",
  function(ev) {
    //  処理
	
  });
player.addPlugin(new Songle.Plugin.Chord());


  // 再生時刻を定期的に更新する
  var span = document.querySelector('span.time');
  setInterval(function () {
    while (span.childNodes.length > 0) span.removeChild(span.childNodes[0]);
    var textNode = document.createTextNode(parseInt(player.position));
    span.appendChild(textNode);
  }, 100);
}
