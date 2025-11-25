function onSongleAPIReady(Songle){
	
  var splayer = new Songle.Player({
      accessToken: '00000144-8PDPBsb' // アクセストークン
	  //mediaElement: "#songle"
  });

	/*const player =
  new window.Songle.Player({
    mediaElement: "#songle"
  });*/

/*splayer.on("ready",
  function(ev) {
    splayer.play();
  });*/

  splayer.addPlugin(new Songle.Plugin.SongleSync());
	//player.useMedia("https://www.youtube.com/watch?v=mTMs1S5td74");
 splayer.addPlugin(new Songle.Plugin.Chord());
let syncMode = false;

//和音


splayer.on("chordEnter",
  function(ev) {
	if (!syncMode) return;
     //do someting ...
	const chordName = ev.data.chord.name;
	let color = "white";
		if (chordName.startsWith("C")){
		color = "hsl(20,70%,60%)";
		} else if (chordName.startsWith("G")) {
		    color = "hsl(40, 70%, 60%)";
		  } else if (chordName.startsWith("F")) {
		    color = "hsl(55, 65%, 60%)";
		  } else if (chordName.startsWith("Am")) {
		    color = "hsl(220, 55%, 55%)";
		  } else if (chordName.startsWith("Dm")) {
		    color = "hsl(200, 50%, 50%)";
		  } else if (chordName.startsWith("Em")) {
		    color = "hsl(240, 60%, 50%)";
		  }else if (chordName.startsWith("G7")) {
		    color = "hsl(40, 85%, 55%)";
		  }else if (chordName.startsWith("Cdim")) {
		    color = "hsl(300, 95%, 40%)";
		  }else if (chordName.startsWith("Csus4")) {
		    color = "hsl(20, 95%, 60%)";
		  }
	  
	document.body.style.backgroundColor = color;
	
  });

	
//同期ボタン
const syncButton = document.querySelector('button.synchronize');
  syncButton.addEventListener('click', () => {
	
	syncMode = true;
	//player.addPlugin(new Songle.Plugin.Chord());

    console.log("同期開始！");
  });

	
//停止
const stopButton = document.querySelector('button.stop');
  stopButton.addEventListener('click', () => {
	  document.body.style.backgroundColor ="white";
	  syncMode = false;
  });

//ボタンでの切り替え
const buttons = document.querySelectorAll('button[data-color]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
	syncMode = false;
    const color = btn.dataset.color; // data-color属性を取る
    document.body.style.backgroundColor = color;
  });
});

  
}
