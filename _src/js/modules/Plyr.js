import Plyr from 'plyr';

const plyrAduio = new Plyr('.plyr-audio-player', {
  autoplay: false
});
const plyrYoutube = new Plyr('.plyr__video-embed', {
  showinfo: 0
});

plyrAduio.on('play', event => {
  const instance = event.detail.plyr;
  plyrYoutube.stop();
});

plyrYoutube.on('play', event => {
  const instance = event.detail.plyr;
  plyrAduio.stop();
});