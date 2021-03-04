// 检查 Aplayer 对象状态
function checkAPlayer() {
<<<<<<< HEAD
	if (APlayerController.player == undefined) {
		setAPlayerObject();
	} else {
		if (APlayerController.observer == undefined) {
			setAPlayerObserver();
		}
	}
=======
  if (APlayerController.player == undefined) {
    setAPlayerObject();
  } else {
    if (APlayerController.observer == undefined) {
      setAPlayerObserver();
    }
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 设置全局播放器所对应的 aplyer 对象
function setAPlayerObject() {
<<<<<<< HEAD
	document.querySelectorAll('meting-js').forEach((item, index)=>{
		if (item.meta.id == APlayerController.id) {
			if (document.querySelectorAll('meting-js')[index].aplayer != undefined) {
 				APlayerController.player = document.querySelectorAll('meting-js')[index].aplayer;
				setAPlayerObserver();
			}
		}
	})
=======
  document.querySelectorAll('meting-js').forEach((item, index) => {
    if (item.meta.id == APlayerController.id) {
      if (document.querySelectorAll('meting-js')[index].aplayer != undefined) {
        APlayerController.player = document.querySelectorAll('meting-js')[index].aplayer;
        setAPlayerObserver();
      }
    }
  });
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 事件监听
function setAPlayerObserver() {
<<<<<<< HEAD
	try {
		APlayerController.player.on('play', function (e) {
			updateAPlayerControllerStatus();
		});
		APlayerController.player.on('pause', function (e) {
			updateAPlayerControllerStatus();
		});
		APlayerController.player.on('volumechange', function (e) {
			onUpdateAPlayerVolume();
		});
		APlayerController.player.on('loadstart', function (e) {
			// 跳到下一曲时更新标题
			updateTitle();
		});

		// 监听音量手势
		APlayerController.volumeBarWrap = document.getElementsByClassName('nav volume')[0].children[0];
		APlayerController.volumeBar = APlayerController.volumeBarWrap.children[0]
		function updateAPlayerVolume(e) {
			let percentage = ((e.clientX || e.changedTouches[0].clientX) - APlayerController.volumeBar.getBoundingClientRect().left) / APlayerController.volumeBar.clientWidth;
			percentage = Math.max(percentage, 0);
			percentage = Math.min(percentage, 1);
			APlayerController.player.volume(percentage);
		}
		const thumbMove = (e) => {
				updateAPlayerVolume(e);
	  };
	  const thumbUp = (e) => {
	      APlayerController.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
	      document.removeEventListener('mouseup', thumbUp);
	      document.removeEventListener('mousemove', thumbMove);
	      updateAPlayerVolume(e);
	  };

	  APlayerController.volumeBarWrap.addEventListener('mousedown', () => {
	      APlayerController.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
	      document.addEventListener('mousemove', thumbMove);
	      document.addEventListener('mouseup', thumbUp);
	  });


		// 设置完监听就立即更新一次
		updateAPlayerControllerStatus();
		onUpdateAPlayerVolume();
		APlayerController.observer = true;
		console.log('APlayerController ready!');

	} catch (error) {
		delete APlayerController.observer;
	}
=======
  try {
    APlayerController.player.on('play', function(e) {
      updateAPlayerControllerStatus();
    });
    APlayerController.player.on('pause', function(e) {
      updateAPlayerControllerStatus();
    });
    APlayerController.player.on('volumechange', function(e) {
      onUpdateAPlayerVolume();
    });
    APlayerController.player.on('loadstart', function(e) {
      // 跳到下一曲时更新标题
      updateTitle();
    });

    // 监听音量手势
    APlayerController.volumeBarWrap = document.getElementsByClassName('nav volume')[0].children[0];
    APlayerController.volumeBar = APlayerController.volumeBarWrap.children[0];
    function updateAPlayerVolume(e) {
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - APlayerController.volumeBar.getBoundingClientRect().left) / APlayerController.volumeBar.clientWidth;
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      APlayerController.player.volume(percentage);
    }
    const thumbMove = (e) => {
      updateAPlayerVolume(e);
    };
    const thumbUp = (e) => {
      APlayerController.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
      document.removeEventListener('mouseup', thumbUp);
      document.removeEventListener('mousemove', thumbMove);
      updateAPlayerVolume(e);
    };

    APlayerController.volumeBarWrap.addEventListener('mousedown', () => {
      APlayerController.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
      document.addEventListener('mousemove', thumbMove);
      document.addEventListener('mouseup', thumbUp);
    });


    // 设置完监听就立即更新一次
    updateAPlayerControllerStatus();
    onUpdateAPlayerVolume();
    APlayerController.observer = true;
    console.log('APlayerController ready!');

  } catch (error) {
    delete APlayerController.observer;
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 更新控制器状态
function updateAPlayerControllerStatus() {
<<<<<<< HEAD
	try {
		if (APlayerController.player.audio.paused) {
			document.getElementsByClassName('nav toggle')[0].children[0].classList.add("fa-play");
			document.getElementsByClassName('nav toggle')[0].children[0].classList.remove("fa-pause");
		} else {
			document.getElementsByClassName('nav toggle')[0].children[0].classList.remove("fa-play");
			document.getElementsByClassName('nav toggle')[0].children[0].classList.add("fa-pause");
		}
	} catch (error) {
		console.log(error);
	}
}
function onUpdateAPlayerVolume() {
	try {
		APlayerController.volumeBar.children[0].style.width = APlayerController.player.audio.volume * 100 + '%'
	} catch (error) {
		console.log(error);
	}
=======
  try {
    if (APlayerController.player.audio.paused) {
      document.getElementsByClassName('nav toggle')[0].children[0].classList.add('fa-play');
      document.getElementsByClassName('nav toggle')[0].children[0].classList.remove('fa-pause');
    } else {
      document.getElementsByClassName('nav toggle')[0].children[0].classList.remove('fa-play');
      document.getElementsByClassName('nav toggle')[0].children[0].classList.add('fa-pause');
    }
  } catch (error) {
    console.log(error);
  }
}
function onUpdateAPlayerVolume() {
  try {
    APlayerController.volumeBar.children[0].style.width = APlayerController.player.audio.volume * 100 + '%';
  } catch (error) {
    console.log(error);
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 播放/暂停
function aplayerToggle() {
<<<<<<< HEAD
	checkAPlayer();
	try {
		APlayerController.player.toggle();
	} catch (error) {
		console.log(error);
	}
=======
  checkAPlayer();
  try {
    APlayerController.player.toggle();
  } catch (error) {
    console.log(error);
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 上一曲
function aplayerBackward() {
<<<<<<< HEAD
	checkAPlayer();
	try {
		APlayerController.player.skipBack();
		APlayerController.player.play();
	} catch (error) {
		console.log(error);
	}
=======
  checkAPlayer();
  try {
    APlayerController.player.skipBack();
    APlayerController.player.play();
  } catch (error) {
    console.log(error);
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 下一曲
function aplayerForward() {
<<<<<<< HEAD
	checkAPlayer();
	try {
		APlayerController.player.skipForward();
		APlayerController.player.play();
	} catch (error) {
		console.log(error);
	}
=======
  checkAPlayer();
  try {
    APlayerController.player.skipForward();
    APlayerController.player.play();
  } catch (error) {
    console.log(error);
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 调节音量
function aplayerVolume(percent) {
<<<<<<< HEAD
	checkAPlayer();
	try {
		APlayerController.player.volume(percent);
	} catch (error) {
		console.log(error);
	}
=======
  checkAPlayer();
  try {
    APlayerController.player.volume(percent);
  } catch (error) {
    console.log(error);
  }
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21
}

// 更新音乐标题
function updateTitle() {
<<<<<<< HEAD
	checkAPlayer();
	try {
		let index = APlayerController.player.list.index;
		let obj = APlayerController.player.list.audios[index];
		document.getElementsByClassName('nav music-title')[0].innerHTML = obj.title;
	} catch (error) {
		console.log(error);
	}
}
var checkrightmenu = setInterval(function () {
  console.log(0)
  if (!document.querySelectorAll('meting-js')[0].meta) return
  if (!document.querySelectorAll('meting-js')[0].meta.id) return
  clearInterval(checkrightmenu)
  checkAPlayer();
  console.log(1)
}, 1000)
=======
  checkAPlayer();
  try {
    const index = APlayerController.player.list.index;
    const obj = APlayerController.player.list.audios[index];
    document.getElementsByClassName('nav music-title')[0].innerHTML = obj.title;
  } catch (error) {
    console.log(error);
  }
}
var checkrightmenu = setInterval(function() {
  if (!document.querySelectorAll('meting-js')[0].meta) return;
  if (!document.querySelectorAll('meting-js')[0].meta.id) return;
  clearInterval(checkrightmenu);
  checkAPlayer();
}, 1000);
>>>>>>> 787d6a6816e192d3e12cd69ead547e4a5c981a21

