import fs from 'fs';

const lines = fs.readFileSync('c:/Users/yener/Desktop/adScope/ai_studio_code.html', 'utf8').split(/\r?\n/);

const part1 = lines.slice(921, 936).join('\n'); // const AdScopeApp = { ... config },
const part2 = lines.slice(1020, 1939).join('\n'); // utils ... init ... };

const out =
    "import { videoDatabase } from './data/videoDatabase.js';\n\n" +
    part1.replace(/^const AdScopeApp = /, 'export const AdScopeApp = ') +
    '\n\n            videoDatabase,\n\n' +
    part2;

fs.writeFileSync('c:/Users/yener/Desktop/adScope/js/modules/adScopeApp.js', out);
