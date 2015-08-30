
const conducts = [
  // breakable conducts
  { check: (player) => !player.brokenConduct.stubborn, affirmMessage: 'You never changed equipment.' },
  { check: (player) => !player.brokenConduct.wieldedWeapon, affirmMessage: 'You never hit with a wielded weapon.' },
  { check: (player) => !player.brokenConduct.pacifist, affirmMessage: 'You %were a pacifist.' },
  { check: (player) => !player.brokenConduct.nudist, affirmMessage: 'You never equipped armor.' },

  // traits
  { check: (player) => player.hasTrait('Infravision'), affirmMessage: 'You %had infravision.' },
  { check: (player) => player.hasTrait('Protection'), affirmMessage: 'You %had protection.' },

  // alignment
  { check: (player) => player.getAlign() === 0, affirmMessage: 'You %were neutral.' },
  { check: (player) => player.getAlign() < 0, affirmMessage: 'You %were evil.' },
  { check: (player) => player.getAlign() > 0, affirmMessage: 'You %were good.' },

  // you probably always see this
  { check: (player) => player.hp.atMin(), affirmMessage: 'You died.' }
];

export default (player) => {
  let finalConduct = [];

  let tenses = [
    { split: '%were', past: 'were', now: 'are' },
    { split: '%had',  past: 'had',  now: 'have' }
  ];

  let adjustMessage = (msg) => _.reduce(tenses, ((prev, obj) => prev.split(obj.split).join(player.hp.atMin() ? obj.past : obj.now)), msg);
  let addMessage = (msg) => finalConduct.push(adjustMessage(msg));

  _.each(conducts, (conduct) => {
    if(conduct.check(player)) {
      addMessage(conduct.affirmMessage);
    } else if(conduct.rejectMessage) {
      addMessage(conduct.rejectMessage);
    }
  });

  return _.sortBy(finalConduct);
};