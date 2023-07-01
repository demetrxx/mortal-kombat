import shangtsungAvatar from './avatars/shangtsung.gif';
import shangtsungSprite from './sprites/shangtsung.gif';
import shangtsungVersus from './versus/shangtsung.png';
import shangtsungName from './names/shangtsung.mp3';

import sindelAvatar from './avatars/sindel.gif';
import sindelSprite from './sprites/sindel.gif';
import sindelVersus from './versus/sindel.png';
import sindelName from './names/sindel.mp3';

import jaxAvatar from './avatars/jax.gif';
import jaxSprite from './sprites/jax.gif';
import jaxVersus from './versus/jax.png';
import jaxName from './names/jax.mp3';

import kanoAvatar from './avatars/kano.gif';
import kanoSprite from './sprites/kano.gif';
import kanoVersus from './versus/kano.png';
import kanoName from './names/kano.mp3';

import liukangAvatar from './avatars/liukang.gif';
import liukangSprite from './sprites/liukang.gif';
import liukangVersus from './versus/liukang.png';
import liukangName from './names/liukang.mp3';

import sonyaAvatar from './avatars/sonya.gif';
import sonyaSprite from './sprites/sonya.gif';
import sonyaVersus from './versus/sonya.png';
import sonyaName from './names/sonya.mp3';

import strykerAvatar from './avatars/stryker.gif';
import strykerSprite from './sprites/stryker.gif';
import strykerVersus from './versus/stryker.png';
import strykerName from './names/stryker.mp3';

import smokeAvatar from './avatars/smoke.gif';
import smokeSprite from './sprites/smoke.gif';
import smokeVersus from './versus/smoke.png';
import smokeName from './names/smoke.mp3';

import subzeroAvatar from './avatars/subzero.gif';
import subzeroSprite from './sprites/subzero.gif';
import subzeroVersus from './versus/subzero.png';
import subzeroName from './names/subzero.mp3';

import cyraxAvatar from './avatars/cyrax.gif';
import cyraxSprite from './sprites/cyrax.gif';
import cyraxVersus from './versus/cyrax.png';
import cyraxName from './names/cyrax.mp3';

import sektorAvatar from './avatars/sektor.gif';
import sektorSprite from './sprites/sektor.gif';
import sektorVersus from './versus/sektor.png';
import sektorName from './names/sektor.mp3';

import nightwolfAvatar from './avatars/nightwolf.gif';
import nightwolfSprite from './sprites/nightwolf.gif';
import nightwolfVersus from './versus/nightwolf.png';
import nightwolfName from './names/nightwolf.mp3';

import sheevaAvatar from './avatars/sheeva.gif';
import sheevaSprite from './sprites/sheeva.gif';
import sheevaVersus from './versus/sheeva.png';
import sheevaName from './names/sheeva.mp3';

import kunglaoAvatar from './avatars/kunglao.gif';
import kunglaoSprite from './sprites/kunglao.gif';
import kunglaoVersus from './versus/kunglao.png';
import kunglaoName from './names/kunglao.mp3';

import kabalAvatar from './avatars/kabal.gif';
import kabalSprite from './sprites/kabal.gif';
import kabalVersus from './versus/kabal.png';
import kabalName from './names/kabal.mp3';

export interface Character {
  id: number;
  name: string;
  avatar: string;
  sprite: string;
  versus: string;
  sound: string;
}

export const charactersMap: Record<number, Character> = {
  1: {
    id: 1,
    name: 'Shang Tsung',
    avatar: shangtsungAvatar,
    sprite: shangtsungSprite,
    versus: shangtsungVersus,
    sound: shangtsungName,
  },
  2: {
    id: 2,
    name: 'Sindel',
    avatar: sindelAvatar,
    sprite: sindelSprite,
    versus: sindelVersus,
    sound: sindelName,
  },
  3: {
    id: 3,
    name: 'Jax',
    avatar: jaxAvatar,
    sprite: jaxSprite,
    versus: jaxVersus,
    sound: jaxName,
  },
  4: {
    id: 4,
    name: 'Kano',
    avatar: kanoAvatar,
    sprite: kanoSprite,
    versus: kanoVersus,
    sound: kanoName,
  },
  5: {
    id: 5,
    name: 'Liu Kang',
    avatar: liukangAvatar,
    sprite: liukangSprite,
    versus: liukangVersus,
    sound: liukangName,
  },
  6: {
    id: 6,
    name: 'sonya',
    avatar: sonyaAvatar,
    sprite: sonyaSprite,
    versus: sonyaVersus,
    sound: sonyaName,
  },
  7: {
    id: 7,
    name: 'Stryker',
    avatar: strykerAvatar,
    sprite: strykerSprite,
    versus: strykerVersus,
    sound: strykerName,
  },
  8: {
    id: 8,
    name: 'Smoke',
    avatar: smokeAvatar,
    sprite: smokeSprite,
    versus: smokeVersus,
    sound: smokeName,
  },
  9: {
    id: 9,
    name: 'Sub Zero',
    avatar: subzeroAvatar,
    sprite: subzeroSprite,
    versus: subzeroVersus,
    sound: subzeroName,
  },
  10: {
    id: 10,
    name: 'Cyrax',
    avatar: cyraxAvatar,
    sprite: cyraxSprite,
    versus: cyraxVersus,
    sound: cyraxName,
  },
  11: {
    id: 11,
    name: 'Sektor',
    avatar: sektorAvatar,
    sprite: sektorSprite,
    versus: sektorVersus,
    sound: sektorName,
  },
  12: {
    id: 12,
    name: 'Night Wolf',
    avatar: nightwolfAvatar,
    sprite: nightwolfSprite,
    versus: nightwolfVersus,
    sound: nightwolfName,
  },
  13: {
    id: 13,
    name: 'Sheeva',
    avatar: sheevaAvatar,
    sprite: sheevaSprite,
    versus: sheevaVersus,
    sound: sheevaName,
  },
  14: {
    id: 14,
    name: 'Kung Lao',
    avatar: kunglaoAvatar,
    sprite: kunglaoSprite,
    versus: kunglaoVersus,
    sound: kunglaoName,
  },
  15: {
    id: 15,
    name: 'Kabal',
    avatar: kabalAvatar,
    sprite: kabalSprite,
    versus: kabalVersus,
    sound: kabalName,
  },
};

export const charactersList = Object.values(charactersMap).sort((a, b) => a.id - b.id);
