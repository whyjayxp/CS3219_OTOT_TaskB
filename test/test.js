const mongoose = require('mongoose')
const Todo = require('../model')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const should = chai.should()

chai.use(chaiHttp)
describe('Todos', () => {
    beforeEach((done) => {
        Todo.deleteMany({}, (err) => {
            done()
        })
    })

    // test for retrieving all tasks
    describe('GET /todo', () => {
        it('it should retrieve all the tasks', (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('message').eql('Tasks retrieved successfully')
                    res.body.data.length.should.be.eql(0)
                    done()
                })
        })
    })

    // test for creating new task
    describe('POST /todo', () => {
        it('it should not create a task without description', (done) => {
            let todo = {
            }
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('error')
                    res.body.message.should.have.property('errors')
                    res.body.message.errors.should.have.property('description')
                    res.body.message.errors.description.should.have.property('kind').eql('required')
                    done()
                })
        })

        it('it should create a task', (done) => {
            let todo = {
                description: 'OTOT Task B2'
            }
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('message').eql('New task added!')
                    res.body.data.should.have.property('status').eql(false)
                    res.body.data.should.have.property('description').eql('OTOT Task B2')
                    done()
                })
        })
    })

    // test for retrieving a task by id
    describe('GET /todo/:id', () => {
        it('it should retrieve the task with the given id', (done) => {
            let todo = new Todo({ description: 'OTOT Task B2', status: false })
            todo.save((err) => {
                chai.request(server)
                    .get('/api/todo/' + todo._id)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('status').eql('success')
                        res.body.should.have.property('message').eql('Task retrieved successfully')
                        res.body.data.should.have.property('status').eql(false)
                        res.body.data.should.have.property('description').eql('OTOT Task B2')
                        done()
                    })
            })
        })

        it('it should return null data if id does not exist', (done) => {
            chai.request(server)
                .get('/api/todo/123456789012345678901234')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('message').eql('Task retrieved successfully')
                    res.body.should.have.property('data').eql(null)
                    done()
                })
        })

        it('it should return error if id is of wrong format', (done) => {
            chai.request(server)
                .get('/api/todo/12345')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('error')
                    done()
                })
        })
    })

    // test for updating a task by id
    describe('PUT /todo/:id', () => {
        it('it should update the task with the given id to completed', (done) => {
            let todo = new Todo({ description: 'OTOT Task B2', status: false })
            todo.save((err) => {
                chai.request(server)
                .put('/api/todo/' + todo._id)
                .send({ status: true })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('message').eql('Task updated!')
                    res.body.data.should.have.property('status').eql(true)
                    res.body.data.should.have.property('description').eql('OTOT Task B2')
                    done()
                })
            })
        })
    })

    // test for deleting a task by id
    describe('DELETE /todo/:id', () => {
        it('it should delete the task with the given id', (done) => {
            let todo = new Todo({ description: 'OTOT Task B2', status: false })
            todo.save((err) => {
                chai.request(server)
                    .delete('/api/todo/' + todo._id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('success')
                    res.body.should.have.property('message').eql('Task deleted!')
                    
                    Todo.exists({ _id: todo._id }, (err, result) => {
                        result.should.be.false 
                        done()
                    })
                })
            })
        })
    })

    
})