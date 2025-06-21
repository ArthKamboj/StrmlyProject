const express = require('express')
const app = express()

const posts  = [
    {
        name: "Arth",
        title: "P1"
    },
    {
        name: "Ayan",
        title: "P2"
    }
]
app.get('/posts', (req,res) => {
    res.json(posts)
})
app.listen(3000)