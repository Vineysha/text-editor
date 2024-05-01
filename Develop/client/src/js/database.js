import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// PUT function
export const putDb = async (id, value) => {
  console.log("PUT request to update the jateDB");
  //connect to DB and version that is to be used
  const jateDB = await openDB("jate", 1);
  // make a new entry - need to direct to the DB that the entry is posting to and the data privileges
  const tx = jateDB.transaction("jate", "readwrite");
  // open the object store
  const objStore = tx.objectStore("jate");
  // use the .add() method to pass in content
  const req = objStore.put({ id: id, value: value });
  //confirm the data was added
  const res = await req;
  console.log("data saved to the jateDB", res);
};

// TODO: Add logic for a method that gets all the content from the database
//GET function
export const getDb = async (value) => {
  console.log("Gettting data from the jateDB");
  //connect to DB and version that is to be used
  const jateDB = await openDB("jate", 1);
  // make a new entry - need to direct to the DB that the entry is posting to and the data privileges
  const tx = jateDB.transaction("jate", "readwrite");
  // open the object store
  const objStore = tx.objectStore("jate");
  // use the .getAll() method to grab all the content in the DB
  const req = objStore.getAll();
  //confirm the data was fetched
  const res = await req;
  console.log("data saved to jateDB", res);
};

initdb();
