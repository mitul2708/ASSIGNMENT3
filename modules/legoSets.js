let sets = [];
require('dotenv').config();

// const setData = require("../data/setData");
// const themeData = require("../data/themeData");

process.env.DB_USER, process.env.DB_DATABASE 
const Sequelize = require('sequelize');

const sequelize = new Sequelize('SenecaDB', 'SenecaDB_owner', 'deGazo37ZwnQ', {
  host: 'ep-morning-sun-a5u64d3m.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

const Theme = sequelize.define('Theme', {
  id: { 
  type: Sequelize.INTEGER,
  primaryKey: (true),
  autoincrement: (true),
  },
  name: Sequelize.STRING,
});

const Set = sequelize.define('Set', {
  set_num: {
  type: Sequelize.STRING,
  primaryKey: (true),
  },
  name: Sequelize.STRING,
  year: Sequelize.INTEGER,
  num_parts: Sequelize.INTEGER,
  theme_id: Sequelize.INTEGER,
  img_url: Sequelize.STRING,
});

Set.belongsTo(Theme, {foreignKey: 'theme_id'})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });


function initialize() {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.sync();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const getAllSets = async () => {
  return new Promise((resolve, reject) => {
    Set.findAll({ include: [Theme] })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("No set found");
      });
  });
};

const getSetByNum = async (setNum) => {
  return new Promise((resolve, reject) => {
    Set.findOne({
      where: { set_num: setNum },
      include: [Theme],
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(`No set found with id of ${setNum}`);
      });
  });
};

const getSetsByTheme = async (theme) => {
  return new Promise((resolve, reject) => {
    Set.findAll({
      where: { "$Theme.name$": { [Sequelize.Op.iLike]: `%${theme}%` } },
      include: [Theme],
    })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(`No set found with theme of ${theme}`);
      });
  });
};

const addSet = async (setData) => {
  return new Promise((resolve, reject) => {
    Set.create(setData)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

const getAllThemes = async () => {
  return new Promise((resolve, reject) => {
    Theme.findAll()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject("No theme found");
      });
  });
};

function editSet(setNum, setData) {
  return new Promise((resolve, reject) => {
    Set.update(setData, {
      where: {
        set_num: setNum,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}


function deleteSet(setNum) {
  return new Promise((resolve, reject) => {
    Set.destroy({
      where: {
        set_num: setNum,
      },
    })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}
  

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }
