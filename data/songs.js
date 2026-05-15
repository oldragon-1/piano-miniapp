/**
 * 内置曲目数据
 * 格式：{ id, title, source, notes: [{note, duration, chord}] }
 * note: 1-7 代表C大调中音 Do~Si (C4-B4)
 *       8=高音1̇(C5), 9=高音2̇(D5), 10=高音3̇(E5)
 * duration: 拍数
 * chord: 和弦名
 */

// 《小星星》Twinkle Twinkle Little Star
const twinkleStar = {
  id: 'twinkle_star',
  title: '小星星',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'G'},

    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 2, chord: 'G'},

    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 2, chord: 'G'},

    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'G'},

    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《欢乐颂》Ode to Joy (完整版，含第一主题+第二段+主题再现)
const odeToJoy = {
  id: 'ode_to_joy',
  title: '欢乐颂（完整版）',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['古典', '贝多芬'],
  notes: [
    // === 第一主题 A (A1) ===
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 2, duration: 2, chord: 'G'},

    // === 第一主题 A (A2) 重复 ===
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1.5, chord: 'G'}, {note: 1, duration: 0.5, chord: 'C'},
    {note: 1, duration: 2, chord: 'C'},

    // === 第二主题 B (桥段) ===
    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'Am'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G7'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G7'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 2, chord: 'C'},

    // === 第三主题 C (变奏) ===
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // === 第一主题 A 再现 (A3) ===
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1.5, chord: 'G'}, {note: 1, duration: 0.5, chord: 'C'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《茉莉花》Jasmine Flower（江苏民歌版，完整段落）
const jasmineFlower = {
  id: 'jasmine_flower',
  title: '茉莉花',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['民歌', '经典'],
  notes: [
    // 好一朵美丽的茉莉花
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 8, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'C'},

    // 芬芳美丽满枝桠
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 2, duration: 2, chord: 'G'},

    // 又香又白人人夸
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 8, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'C'},

    // 让我来将你摘下
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'},

    // 送给别人家 茉莉花
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《送别》Farewell（李叔同词，完整段落）
const farewell = {
  id: 'farewell',
  title: '送别',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['经典', '抒情'],
  notes: [
    // 长亭外 古道边
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'C'},

    // 芳草碧连天
    {note: 7, duration: 1, chord: 'G'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'C'},

    // 晚风拂柳笛声残
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 9, duration: 1, chord: 'G'},

    // 夕阳山外山
    {note: 8, duration: 1, chord: 'C'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 2, chord: 'C'},

    // 天之涯 地之角
    {note: 8, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'C'},
    {note: 9, duration: 1, chord: 'G'}, {note: 9, duration: 1, chord: 'G'},

    // 知交半零落
    {note: 10, duration: 1, chord: 'G'}, {note: 9, duration: 1, chord: 'G'},
    {note: 8, duration: 2, chord: 'C'},

    // 一壶浊酒尽余欢
    {note: 8, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},

    // 今宵别梦寒
    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},

    // === 第二段（重复旋律）===
    // 长亭外 古道边
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'C'},
    {note: 7, duration: 1, chord: 'G'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'C'},

    // 问君此去几时来
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 9, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 2, chord: 'C'},

    // 天之涯 地之角
    {note: 8, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'C'},
    {note: 9, duration: 1, chord: 'G'}, {note: 9, duration: 1, chord: 'G'},
    {note: 10, duration: 1, chord: 'G'}, {note: 9, duration: 1, chord: 'G'},
    {note: 8, duration: 2, chord: 'C'},

    // 人生难得是欢聚
    {note: 8, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'}
  ]
}

// ==================== 新增曲目 ====================

// 《月亮代表我的心》根据用户提供的简谱标注整理
// 符号: -5/-6/-7=低音, +1=高音, ·=附点, -=延长
const moonRepresentsHeart = {
  id: 'moon_represents_heart',
  title: '月亮代表我的心',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['经典', '抒情'],
  notes: [
    // ============================
    //  前奏：-5 - -5 3 2 1 | 3 - - - | -6 - -6 4 2 1 | -7 - - -
    // ============================
    {note: 5, octave: -1, duration: 2, chord: 'C'},
    {note: 5, octave: -1, duration: 0.5, chord: 'C'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 0.5, chord: 'C'},
    {note: 3, duration: 4, chord: 'C'},
    {note: 6, octave: -1, duration: 2, chord: 'F'},
    {note: 6, octave: -1, duration: 0.5, chord: 'F'},
    {note: 4, duration: 0.5, chord: 'F'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 0.5, chord: 'C'},
    {note: 7, octave: -1, duration: 4, chord: 'G'},

    // ============================
    //  A段（主歌重复）: 0 -5 | 1· 1 1 3 2 | 1· 1 1 2 3 | 3 - - -5 | ×N
    // ============================
    // 弱起: -5
    {note: 5, octave: -1, duration: 1, chord: 'C'},

    // 段1: 1· 1 1 3 2 | 1· 1 1 2 3 | 3 - - -5
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'}, {note: 5, octave: -1, duration: 1, chord: 'C'},

    // 段2
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'}, {note: 5, octave: -1, duration: 1, chord: 'C'},

    // 段3
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'}, {note: 5, octave: -1, duration: 1, chord: 'C'},

    // 段4
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'}, {note: 5, octave: -1, duration: 1, chord: 'C'},

    // 段5（第一结尾）：2 - - -
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 4, chord: 'G'},

    // 段6（全曲结尾）：1 - - -
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 1, duration: 4, chord: 'C'},

    // ============================
    //  B段（副歌）: 0 -5 | 6· 7 6· 5 | 3 - - 5 | 3· 2 1 5 | 7 - - 6 7 |
    // ============================
    {note: 5, octave: -1, duration: 1, chord: 'C'},
    {note: 6, duration: 1.5, chord: 'F'}, {note: 7, duration: 0.5, chord: 'G'},
    {note: 6, duration: 1.5, chord: 'F'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 3, duration: 3, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 7, duration: 2, chord: 'G'}, {note: 6, duration: 1, chord: 'F'},
    {note: 7, duration: 1, chord: 'G'},

    // === 1· 1 1 2 3 | 2 - - -5 | ===
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 3, chord: 'G'}, {note: 5, octave: -1, duration: 1, chord: 'C'},

    // === 1· 3 5· 1 | 7· 3 5· 5 | ===
    {note: 1, duration: 1.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1.5, chord: 'C'}, {note: 1, duration: 0.5, chord: 'C'},
    {note: 7, duration: 1.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},

    // === 6· 7 +1· 6 6 5 | 5 - - 3 2 | ===
    {note: 6, duration: 1, chord: 'F'}, {note: 7, duration: 0.5, chord: 'G'},
    {note: 1, octave: 1, duration: 1, chord: 'C'},
    {note: 6, duration: 0.5, chord: 'F'}, {note: 6, duration: 0.5, chord: 'F'},
    {note: 5, duration: 0.5, chord: 'C'},
    {note: 5, duration: 2, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'},

    // === 1· 1 1 3 2 | ===
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'},

    // === 1· 1 2 3 | 2· 1 1 - || ===
    {note: 1, duration: 1.5, chord: 'C'}, {note: 1, duration: 0.5, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1.5, chord: 'G'}, {note: 1, duration: 0.5, chord: 'C'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《念故乡》Going Home - 德沃夏克《自新大陆》第二乐章
const goingHome = {
  id: 'going_home',
  title: '念故乡',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['古典', '抒情'],
  notes: [
    // 第一句
    {note: 5, duration: 1.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 3, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // 第二句
    {note: 2, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 2, duration: 1.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 3, duration: 2, chord: 'C'},

    // 第三句（重复第一句）
    {note: 5, duration: 1.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 3, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // 第四句（结尾）
    {note: 2, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1.5, chord: 'C'},
    {note: 1, duration: 0.5, chord: 'C'}, {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《阿里郎》Arirang - 朝鲜族传统民谣
const arirang = {
  id: 'arirang',
  title: '阿里郎',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['民歌', '经典'],
  notes: [
    // 第一句：阿里郎~阿里郎~
    {note: 5, duration: 1, chord: 'Am'}, {note: 6, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'F'}, {note: 6, duration: 2, chord: 'Am'},

    // 第二句：阿拉里郎~哟~
    {note: 5, duration: 1, chord: 'Am'}, {note: 6, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // 第三句：越过那~山岗~
    {note: 1, duration: 0.5, chord: 'F'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'Am'}, {note: 5, duration: 2, chord: 'Am'},

    // 第四句：白天的星星~
    {note: 5, duration: 1, chord: 'Am'}, {note: 6, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《摇篮曲》根据用户提供的完整歌词简谱修正
const lullaby = {
  id: 'lullaby',
  title: '摇篮曲',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['古典', '抒情'],
  notes: [
    // === 第一句：睡吧睡吧我亲爱的宝贝 ===
    // 3  5  2· 3  4 | 3  3  2  1  7  1 |
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 0.5, chord: 'G'},
    {note: 2, duration: 1.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 7, duration: 0.5, chord: 'G'}, {note: 1, duration: 0.5, chord: 'C'},

    // === 第二句：妈妈的双手轻轻摇着你 ===
    // 2  5  3  5  2· 3  4 | 3  3  2  3  4  2 | 1  0 |
    {note: 2, duration: 0.5, chord: 'G'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 2, duration: 1.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 4, duration: 0.5, chord: 'F'}, {note: 2, duration: 1.5, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // === 第三句：摇篮摇你快快安睡 ===
    // 2  2  3  2  1 | 5  4  3  2  5 |
    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'},
    {note: 5, duration: 0.5, chord: 'C'}, {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'C'},

    // === 第四句：夜已安静，被里多温暖 ===
    // 3  5  2· 3  4 | 3  3  2  3  4  2 | 1  0 ||
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 2, duration: 1.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 2, duration: 0.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 4, duration: 0.5, chord: 'F'}, {note: 2, duration: 1.5, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《伦敦桥》London Bridge - 英国传统童谣
const londonBridge = {
  id: 'london_bridge',
  title: '伦敦桥',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    // 第一段
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'G'},
    {note: 5, duration: 2, chord: 'C'},

    // 第二段
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'G'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 2, chord: 'C'},

    // 第三段
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},

    // 第四段
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《两只老虎》Frère Jacques
const frereJacques = {
  id: 'frere_jacques',
  title: '两只老虎',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},

    {note: 3, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'G'},
    {note: 3, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 5, duration: 2, chord: 'G'},

    {note: 5, duration: 0.5, chord: 'C'}, {note: 6, duration: 0.5, chord: 'F'},
    {note: 5, duration: 0.5, chord: 'G'}, {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 5, duration: 0.5, chord: 'G'}, {note: 6, duration: 0.5, chord: 'F'},
    {note: 5, duration: 0.5, chord: 'G'}, {note: 4, duration: 0.5, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},

    {note: 1, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《玛丽有只小羊羔》Mary Had a Little Lamb
const maryHadALamb = {
  id: 'mary_lamb',
  title: '玛丽有只小羊羔',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 1, chord: 'G'},
    {note: 2, duration: 2, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 5, duration: 2, chord: 'G'},

    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 2, duration: 1, chord: 'G'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《洋娃娃和小熊跳舞》Polish folk dance
const dollAndBear = {
  id: 'doll_and_bear',
  title: '洋娃娃和小熊跳舞',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 2, chord: 'C'},

    {note: 1, duration: 1, chord: 'F'}, {note: 1, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'F'}, {note: 1, duration: 1, chord: 'F'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《划船歌》Row Row Row Your Boat
const rowYourBoat = {
  id: 'row_your_boat',
  title: '划船歌',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 1.5, chord: 'C'}, {note: 2, duration: 0.5, chord: 'G'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'G'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 2, chord: 'C'},

    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 1, chord: 'C'},
    {note: 1, duration: 1, chord: 'C'}, {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《铃儿响叮当》Jingle Bells
const jingleBells = {
  id: 'jingle_bells',
  title: '铃儿响叮当',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['经典', '节日'],
  notes: [
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 1.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 1, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 4, chord: 'C'},

    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 4, duration: 1.5, chord: 'F'}, {note: 4, duration: 0.5, chord: 'F'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 5, duration: 1, chord: 'G'},
    {note: 4, duration: 1, chord: 'F'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 4, chord: 'C'}
  ]
}

// 《粉刷匠》Little Painter (Polish folk)
const littlePainter = {
  id: 'little_painter',
  title: '粉刷匠',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['儿歌', '经典'],
  notes: [
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'},

    {note: 2, duration: 1, chord: 'G'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'}
  ]
}

// 《卡农简化版》Canon in C（帕赫贝尔卡农旋律精华段落）
const canonInC = {
  id: 'canon_in_c',
  title: '卡农（简化版）',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['古典', '经典'],
  notes: [
    // 第一段：经典和弦进行上的旋律 C-G-Am-Em-F-C-F-G
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'Am'}, {note: 7, duration: 1, chord: 'Em'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'G'},
    {note: 2, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'G'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},

    // 第二段变奏
    {note: 5, duration: 0.5, chord: 'C'}, {note: 6, duration: 0.5, chord: 'C'},
    {note: 5, duration: 0.5, chord: 'G'}, {note: 3, duration: 0.5, chord: 'G'},
    {note: 8, duration: 0.5, chord: 'Am'}, {note: 7, duration: 0.5, chord: 'Am'},
    {note: 6, duration: 0.5, chord: 'Em'}, {note: 5, duration: 0.5, chord: 'Em'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'G'},
    {note: 2, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'G'},

    // 第三段-高潮
    {note: 5, duration: 0.5, chord: 'C'}, {note: 8, duration: 0.5, chord: 'C'},
    {note: 7, duration: 0.5, chord: 'G'}, {note: 6, duration: 0.5, chord: 'G'},
    {note: 5, duration: 0.5, chord: 'Am'}, {note: 8, duration: 0.5, chord: 'Am'},
    {note: 7, duration: 0.5, chord: 'Em'}, {note: 6, duration: 0.5, chord: 'Em'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'G'},
    {note: 2, duration: 1, chord: 'C'}, {note: 1, duration: 1, chord: 'G'},
    {note: 2, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'G'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'G'},
    {note: 3, duration: 2, chord: 'C'}
  ]
}

// ==================== 精选新增曲目 ====================

// 《天空之城》Castle in the Sky - 久石让（C大调，Medium难度21键版）
const castleInTheSky = {
  id: 'castle_in_the_sky',
  title: '天空之城',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['动漫', '久石让', '治愈'],
  notes: [
    // === 第1小节 ===
    // 上：0 0 0 6' 7'  |  下：0 0 0 0
    {note: 0, duration: 3, chord: 'Am'},
    {note: 6, duration: 0.5, chord: 'Am'}, {note: 7, duration: 0.5, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 10, duration: 1.5, chord: 'F'},
    {note: 7, duration: 2.5, chord: 'G'},

    {note: 6, duration: 1, chord: 'Am'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 10, duration: 1, chord: 'F'},
    {note: 7, duration: 1, chord: 'G'}, {note: 8, duration: 2, chord: 'C'},
    {note: 6, duration: 2, chord: 'Am'},

    // B段
    {note: 3, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 6, duration: 1, chord: 'F'},
    {note: 7, duration: 2, chord: 'G'}, {note: 7, duration: 2, chord: 'G'},

    {note: 6, duration: 1, chord: 'Am'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 10, duration: 1.5, chord: 'F'},
    {note: 7, duration: 2.5, chord: 'G'},

    {note: 6, duration: 1, chord: 'Am'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 10, duration: 1, chord: 'F'},
    {note: 7, duration: 1, chord: 'G'}, {note: 8, duration: 1, chord: 'C'},
    {note: 6, duration: 2, chord: 'Am'}
  ]
}

// 《更替的四季》めぐる季節 - 久石让《魔女宅急便》（C大调简化版）
const changingSeasons = {
  id: 'changing_seasons',
  title: '更替的四季',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['动漫', '久石让', '治愈'],
  notes: [
    // 主旋律
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 6, duration: 1, chord: 'Am'}, {note: 8, duration: 1, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'},

    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 6, duration: 1, chord: 'Am'}, {note: 8, duration: 1, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'F'}, {note: 8, duration: 1, chord: 'F'},
    {note: 6, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 5, duration: 2, chord: 'C'}
  ]
}

// 《永远同在》いつも何度でも - 木村弓《千与千寻》（C大调简化版）
const alwaysWithMe = {
  id: 'always_with_me',
  title: '永远同在',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['动漫', '治愈', '千与千寻'],
  notes: [
    // 主旋律
    {note: 3, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'F'},
    {note: 5, duration: 1.5, chord: 'G'}, {note: 6, duration: 0.5, chord: 'Am'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},

    {note: 1, duration: 2, chord: 'C'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 3, chord: 'C'},

    {note: 3, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'F'},
    {note: 5, duration: 1.5, chord: 'G'}, {note: 6, duration: 0.5, chord: 'Am'},
    {note: 5, duration: 1, chord: 'G'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'F'},

    {note: 5, duration: 2, chord: 'G'}, {note: 5, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《哆啦A梦》Doraemon（主题曲简化版）
const doraemon = {
  id: 'doraemon',
  title: '哆啦A梦',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['动漫', '经典', '儿歌'],
  notes: [
    // 主题旋律
    {note: 5, duration: 0.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 2, chord: 'G'},

    {note: 6, duration: 0.5, chord: 'F'}, {note: 6, duration: 0.5, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 2, chord: 'C'},

    {note: 5, duration: 0.5, chord: 'C'}, {note: 5, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 5, duration: 2, chord: 'G'},

    {note: 6, duration: 0.5, chord: 'F'}, {note: 6, duration: 0.5, chord: 'F'},
    {note: 6, duration: 1, chord: 'F'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1, chord: 'C'}, {note: 6, duration: 2, chord: 'Am'}
  ]
}

// 《祝你生日快乐》Happy Birthday（C大调简化版）
const happyBirthday = {
  id: 'happy_birthday',
  title: '祝你生日快乐',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['经典', '节日', '儿歌'],
  notes: [
    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'G'}, {note: 5, duration: 1, chord: 'C'},
    {note: 8, duration: 1, chord: 'F'}, {note: 7, duration: 2, chord: 'G'},

    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 6, duration: 1, chord: 'G'}, {note: 5, duration: 1, chord: 'C'},
    {note: 9, duration: 1, chord: 'G'}, {note: 8, duration: 2, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'C'},
    {note: 10, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'F'},
    {note: 7, duration: 1, chord: 'G'}, {note: 6, duration: 2, chord: 'F'},

    {note: 4, duration: 1, chord: 'F'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 8, duration: 1, chord: 'F'},
    {note: 7, duration: 2.5, chord: 'G'}
  ]
}

// 《Five Hundred Miles》（C大调简化版）
const fiveHundredMiles = {
  id: 'five_hundred_miles',
  title: 'Five Hundred Miles',
  source: 'public_domain',
  difficulty: 'easy',
  layer: 1,
  access: 'free',
  tags: ['民谣', '经典', '英文'],
  notes: [
    // 主歌
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'Am'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 5, duration: 1, chord: 'G'},
    {note: 6, duration: 1, chord: 'Am'}, {note: 5, duration: 1, chord: 'C'},

    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'Am'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'},

    // 副歌
    {note: 5, duration: 1, chord: 'C'}, {note: 6, duration: 1, chord: 'Am'},
    {note: 1, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 6, duration: 1, chord: 'Am'},
    {note: 5, duration: 1, chord: 'C'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《Yesterday》The Beatles（C大调简化版）
const yesterday = {
  id: 'yesterday',
  title: 'Yesterday',
  source: 'public_domain',
  difficulty: 'medium',
  layer: 2,
  access: 'free',
  tags: ['经典', '英文', '披头士'],
  notes: [
    // 主歌
    {note: 2, duration: 1.5, chord: 'G'}, {note: 1, duration: 0.5, chord: 'G'},
    {note: 6, duration: 1, chord: 'F'}, {note: 1, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 3, duration: 2, chord: 'C'},

    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 1, chord: 'C'},
    {note: 2, duration: 1, chord: 'G'}, {note: 1, duration: 2, chord: 'C'},

    {note: 7, duration: 1, chord: 'G'}, {note: 6, duration: 1, chord: 'F'},
    {note: 5, duration: 1, chord: 'C'}, {note: 4, duration: 1, chord: 'F'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 2, chord: 'C'},

    // 副歌
    {note: 6, duration: 1, chord: 'F'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1.5, chord: 'C'}, {note: 7, duration: 0.5, chord: 'G'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 4, duration: 1, chord: 'F'}, {note: 3, duration: 2, chord: 'C'},

    {note: 6, duration: 1, chord: 'F'}, {note: 7, duration: 1, chord: 'G'},
    {note: 8, duration: 1.5, chord: 'C'}, {note: 7, duration: 0.5, chord: 'G'},
    {note: 6, duration: 1, chord: 'F'}, {note: 5, duration: 1, chord: 'C'},
    {note: 3, duration: 1, chord: 'C'}, {note: 2, duration: 1, chord: 'G'},
    {note: 1, duration: 3, chord: 'C'}
  ]
}

// 《土耳其进行曲》简化版 - Mozart（C大调，Hard难度36键版）
const turkishMarch = {
  id: 'turkish_march',
  title: '土耳其进行曲',
  source: 'public_domain',
  difficulty: 'hard',
  layer: 3,
  access: 'free',
  tags: ['古典', '莫扎特', '练习'],
  notes: [
    // 主题片段 - 使用较宽音域
    {note: 5, duration: 0.5, chord: 'C'}, {note: 6, duration: 0.5, chord: 'C'},
    {note: 8, duration: 0.5, chord: 'G'}, {note: 6, duration: 0.5, chord: 'G'},
    {note: 5, duration: 0.5, chord: 'C'}, {note: 3, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 6, duration: 1, chord: 'G'},

    {note: 8, duration: 0.5, chord: 'C'}, {note: 9, duration: 0.5, chord: 'C'},
    {note: 10, duration: 0.5, chord: 'G'}, {note: 9, duration: 0.5, chord: 'G'},
    {note: 8, duration: 0.5, chord: 'C'}, {note: 6, duration: 0.5, chord: 'C'},
    {note: 5, duration: 1, chord: 'G'}, {note: 3, duration: 1, chord: 'G'},

    // 高音区片段
    {note: 15, duration: 0.5, chord: 'C'}, {note: 16, duration: 0.5, chord: 'C'},
    {note: 17, duration: 0.5, chord: 'G'}, {note: 16, duration: 0.5, chord: 'G'},
    {note: 15, duration: 0.5, chord: 'C'}, {note: 13, duration: 0.5, chord: 'C'},
    {note: 12, duration: 1, chord: 'F'}, {note: 11, duration: 1, chord: 'F'},

    // 回流到中音区
    {note: 8, duration: 0.5, chord: 'C'}, {note: 9, duration: 0.5, chord: 'C'},
    {note: 10, duration: 0.5, chord: 'G'}, {note: 9, duration: 0.5, chord: 'G'},
    {note: 8, duration: 0.5, chord: 'C'}, {note: 6, duration: 0.5, chord: 'C'},
    {note: 5, duration: 2, chord: 'C'}
  ]
}

// 导出所有曲目
const songs = [
  twinkleStar, odeToJoy, jasmineFlower, farewell,
  goingHome, arirang, lullaby, londonBridge,
  frereJacques, maryHadALamb, dollAndBear, rowYourBoat, jingleBells,
  littlePainter, canonInC, moonRepresentsHeart,
  castleInTheSky, changingSeasons, alwaysWithMe, doraemon,
  happyBirthday, fiveHundredMiles, yesterday,
  turkishMarch  // Hard 层测试曲目
]

// 按ID建立索引
const songMap = {}
songs.forEach(s => { songMap[s.id] = s })

module.exports = {
  songs,
  songMap,
  getSongById(id) { return songMap[id] },
  getDailyRecommendation() {
    // 根据日期轮转推荐
    const dayIndex = new Date().getDate() % songs.length
    return songs[dayIndex]
  }
}
