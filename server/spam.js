const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/local.sqlite");

const run = () => {
  db.run(
    `INSERT INTO Spamme(email) VALUES(?)`,
    ["aflefawfwfewf@flakjlefjwlfjweaef.no"],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

let i = 0;
while (i < 80000) {
  run();
  i++;
}
