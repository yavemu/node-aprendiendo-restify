// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Base de datos
// ============================
// process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/my_restifydb';
process.env.URLDB = process.env.URLDB || 'mongodb://dbmongo:27017/my_restifydb';