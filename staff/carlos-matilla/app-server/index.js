const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const users = require('./data/data')
const bodyParser = require('body-parser')
const {retrieveUser, register, authenticate} = require('./logic')
const {App, Landing, Login, Register, Home} = require('./components')


const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })


const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)


app.use(express.static(path.join(__dirname, 'public')))

app.use(urlencodedBodyParser)

app.get('/', (req, res) => {
    res.send(App({ title: 'My App', body: Landing() }))
})

app.get('/login', (req, res) => {
    res.send(App({ title: 'Login', body: Login() }))
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    try {
        authenticate(username, password)

        sessions.push(username)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

     if (sessions.includes(username)) {
        const { name } = retrieveUser(username)

        res.send(App({ title: 'Home', body: Home({ name, username }) }))
   } else res.redirect('/login')
})

app.get('/register', (req, res) => {
    res.send(App({ title: 'Register', body: Register() }))
})

app.post('/register', (req,res)=>{
    const { name, surname, username, password } = req.body 
    try {
        register(name, surname, username, password)
        res.send(App({ title: 'Login', body: Login() }))
    } catch (error) {
        console.error(error)
    }
})





app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})