const { registerUser } = require('.')
const { fetch } = require('../utils')
const { call } = require('../utils')

describe('registerUser', () => {
    let name, surname, username, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    it('should succeed on new user', ()=> 
        registerUser(name, surname, username, password)
            .then(()=>{expect(response).toBeUndefined()})
            

            

           
        
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password })
            }).then(response => {
        
                if (response.status === 201) return
                else if (response.status === 409) {
                    const { error } = JSON.parse(response.content)
        
                    throw(new Error(error))
                } else throw(new Error('Unknown error'))
            })
        })

        it('should fail on already existing user', () => {
            registerUser(name, surname, username, password) 
                .catch(()=>{ expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username "${username}" already exists`)})
               

                
            })
        })
    })

    afterEach(done => {
        call(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }, (error, response) => {
            if (error) return done(error)

            const { error: _error, token } = JSON.parse(response.content)

            if (_error) return done(new Error(_error))

            call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password })
            }, (error, response) => {
                if (error) return done(error)

                if (response.content) {
                    const { error } = JSON.parse(response.content)

                    if (error) return done(new Error(error))
                }

                done()
            })
        })
    })
