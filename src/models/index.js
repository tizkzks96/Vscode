const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize("node_example", "root", "0000",{ hotst: "localhost", dialect: "mysql"});

sequelize.authenticate().then(() => {
    console. log("연결 성공");
}).catch(err => {
    console. log("연결 실패 : ", err);
});

// 파일을 읽어서 리턴
fs.readdirSync(__dirname).filter(file =>{

    // 파일 명은 . 단위로 구분해 읽어오며 .js만 읽어옴, file 네임이 basename 이 아닐경우 리턴
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");

}).forEach(file => {

    //현재 폴더 안에있는 파일들을 찾은 후 index.js 파일을 제외한 나머지 파일을 찾아서 sequelize model 로 import한다.
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
});

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate){
        db[modelName].associate(db);
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
