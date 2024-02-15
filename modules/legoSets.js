const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
      sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id).name;
        return { ...set, theme };
      });
      if (sets.length > 0) {
        resolve("The sets array is filled with objects");
      } else {
        reject("Initialization failed");
      }
    });
  }

  function getAllSets() {
    return new Promise((resolve, reject) => {
      if (sets.length > 0) {
        resolve(sets);
      } else {
        reject("No sets found");
      }
    });
  }

  function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const set = sets.find((s) => s.set_num === setNum);
      if (set) {
        resolve(set);
      } else {
        reject("Set not found");
      }
    });
  }

  function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const matchingSets = sets.filter((s) =>
        s.theme.toLowerCase().includes(theme.toLowerCase())
      );
      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject("No sets found for the theme");
      }
    });
  }

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }



