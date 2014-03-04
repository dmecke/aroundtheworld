var level1 = ['europe', 'northamerica', 'southamerica', 'asia', 'africa', 'oceania'];

var level2 = {};
level2.europe = ['germany', 'france']; // incomplete
level2.northamerica = ['unitedstates']; // incomplete
level2.southamerica = [];
level2.asia = [];
level2.africa = [];
level2.oceania = [];

var level3 = {};
level3.europe = {};
level3.europe.germany = ['schleswigholstein', 'hamburg', 'lowersaxony']; // incomplete
level3.europe.france = [];
level3.northamerica = {};
level3.northamerica.unitedstates = ['newjersey']; // incomplete
level3.southamerica = {};
level3.asia = {};
level3.africa = {};
level3.oceania = {};

var level4 = {};
level4.europe = {};
level4.europe.germany = {};
level4.europe.germany.schleswigholstein = ['stormarn', 'rendsburgeckernförde'];
level4.europe.germany.hamburg = [];
level4.europe.germany.lowersaxony = [];
level4.northamerica = {};
level4.northamerica.unitedstates = {};
level4.northamerica.unitedstates.newjersey = [];
