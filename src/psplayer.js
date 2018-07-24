import {soundManager} from 'soundmanager2';
import Vue from 'vue';
import API from '@/services/API';
import store from '@/store';

class PSPlayer {
  constructor(store) {
    this.$phraseContainer = document.getElementById('pslight-bar');
    this.mode = 'full';
    this.$store = store;
    this.baseUrl = API.getApiBaseUrl();
  }

  setMode(mode) {
    this.mode = mode;
  }

  getToken() {
    return this.$store.state.token;
  }

  getVoice() {
    return this.$store.getters.getVoice;
  }

  soundStart(url) {
    const soundParams = `_token=${this.getToken()}&_voice=${this.getVoice()}`;
    const soundUrl = this.baseUrl + url + '?' + soundParams;
    this.sound = soundManager.createSound({
      url: soundUrl,
      onfinish: this.soundFinish.bind(this),
    });
    this.sound.play();
  }

  markAsPlayed() {
    if (this.item.IsPlayed) {
      return;
    }

    API.setItemPlayed(this.item._id).then((response) => {
      Vue.set(this.item, 'IsPlayed', true);
    });
  }

  play(item) {
    if (this.item) {
      Vue.set(this.item, 'isActive', false);
    }

    if (this.sound) {
      this.sound.destruct();
    }

    this.item = item;
    Vue.set(item, 'isActive', true);
    this.setPhrase(PSPlayer.morphPhrase(item.Value, this.mode === 'caps'));
    this.markAsPlayed();
    this.soundStart('/v1/tts/play/' + this.mode + '/' + item._id);
  }

  setPhrase(phrase) {
    this.$phraseContainer.innerHTML = phrase;
  }

  soundFinish() {
    this.setPhrase('');
    this.item.isActive = false;
  }

  static isFragmentAcceptable(fragment) {
    if (fragment === 'I') {
      return false;
    }

    // We do not accept numbers
    return isNaN(fragment);
  }

  static morphPhrase(phrase, onlyCaps) {
    const matches = phrase.match(/\b[A-Z\W]{3,}\b/g);
    const acceptedMatches = [];
    matches.forEach((match) => {
      match = match.trim();
      if (PSPlayer.isFragmentAcceptable(match)) {
        phrase = phrase.replace(
          match,
          `<span style="color:red;">${match}</span>`
        );
        acceptedMatches.push(match);
      }
    });

    if (onlyCaps) {
      const joinedMatches = acceptedMatches.join(' ');

      return `<span style="color:red;">${joinedMatches}</span>`;
    } else {
      return phrase;
    }
  }
}

let psplayer = new PSPlayer(store);

export {
  PSPlayer,
  psplayer,
};
