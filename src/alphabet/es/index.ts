import letter0Data from './letters/0';
import letter1Data from './letters/1';
import letter2Data from './letters/2';
import letter3Data from './letters/3';
import letter4Data from './letters/4';
import letter5Data from './letters/5';

export const alphabet_es = [
  {
    value: 'a',
    index: 0,
    data: letter0Data,
    mp3: require('./mp3/letters/0.mp3'),
  },
  {
    value: 'b',
    index: 1,
    data: letter1Data,
    mp3: require('./mp3/letters/1.mp3'),
  },
  {
    value: 'c',
    index: 2,
    data: letter2Data,
    mp3: require('./mp3/letters/2.mp3'),
  },
  {
    value: 'd',
    index: 3,
    data: letter3Data,
    mp3: require('./mp3/letters/3.mp3'),
  },
  {value: 'e', index: 4, data: letter4Data},
  {value: 'f', index: 5, data: letter5Data},
];
