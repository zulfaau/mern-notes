const app = require("./app")
const connection = require("./config/db")

connection.connect((err) => {
    if(err) throw err
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server and MySQL database has connected")
    })
})
