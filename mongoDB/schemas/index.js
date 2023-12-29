const mongoose = require("mongoose");
const mongooseURL = "mongodb://root:rootcute@127.0.0.1:27017/admin";

const connect = async () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  try {
    await mongoose.connect(mongooseURL, {
      dbName: "nodejs",
      useNewUrlParser: true,
    });
    console.log("몽고디비 연결 성공!");
  } catch (err) {
    console.log("몽고디비 연결 에러", err);
  }
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결이 에러로 끊어짐", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
  connect();
});

module.exports = connect;
