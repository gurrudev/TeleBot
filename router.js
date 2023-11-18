const express = require('express')

const route = express();

const routes = () => {

    route.get('/', (req, res) => {
        res.send("Working...");
    })

    const PORT = process.env.PORT || 3000

    route.listen(PORT, () => {
        console.log("🚀 app is running on port number :", PORT);
    });

}
 

module.exports = {
    routes
}