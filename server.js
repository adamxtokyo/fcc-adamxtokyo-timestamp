
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// So that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors({optionSuccessStatus: 200})) // Some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})


// API endpoints
app.get('/api/timestamp/:ts', function (req, res) {
    let ts = new Date(req.params.ts)
    if (!ts.getTime()) ts = new Date(Number(req.params.ts))
    if (!ts.getTime()) return res.json({"error": "Invalid Date"})
    return res.json({"unix": ts.getTime(), "utc": ts.toUTCString()})
})


// Listen for requests
const listener = app.listen(PORT, function () {
    console.log(`App is listening on port ${listener.address().port}`)
})
