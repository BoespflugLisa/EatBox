import express from "express"
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()


const port = 3036;


app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

app.listen(port, function () {
    console.log("Runnning on " + port);
});

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
