import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()


const port = 3036;


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

const UsersRouter = require("./routes/UserRouter");
app.use("/auth", UsersRouter);

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;

/*
// A `main` function so that you can use async/await
async function main() {

    const allUsers = await prisma.users.findMany({
        include: { role: true },
    })
    // use `console.dir` to print nested objects
    console.dir(allUsers, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })*/
