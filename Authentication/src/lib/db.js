import mongoose from "mongoose";

const Dbconnect = async () => {
     mongoose.connect(process.env.MOONOSEURL).then(() => {
          console.log("connect successfull")
     }).catch((error) => {
          console.log("connect was failed")
     })
}

export default Dbconnect;