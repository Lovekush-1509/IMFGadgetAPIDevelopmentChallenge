const express = require("express");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const connectDB = require("./Configure/DataBaseConnect");
const route = require("./Routes/routes");


connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/gadgets",route);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`hello server started on ${PORT}`);
});

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:`Your server started on ${PORT}`,
    });
});

