Todo = require('./model')

exports.index = (req, res) => {
    Todo.get((err, todos) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Tasks retrieved successfully',
                data: todos
            })
        }
    })
}

exports.new = (req, res) => {
    let todo = new Todo()
    todo.description = req.body.description
    todo.status = req.body.status ? req.body.status : false
    todo.save((err) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'New task added!',
                data: todo
            })
        }
    })
}

exports.view = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Task retrieved successfully',
                data: todo
            })
        }
    })
}

exports.update = (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) res.send(err);
        todo.description = req.body.description ? req.body.description : todo.description
        todo.status = req.body.status ? req.body.status : todo.status 
        todo.save((err) => {
            if (err) {
                res.json({
                    status: 'error',
                    message: err
                })
            } else {
                res.json({
                    status: 'success',
                    message: 'Task updated!',
                    data: todo
                })
            }
        })
    
    })
}

exports.delete = (req, res) => {
    Todo.deleteOne({
        _id: req.params.id 
    }, (err, todo) => {
        if (err) {
            res.json({
                status: 'error',
                message: err
            })
        } else {
            res.json({
                status: 'success',
                message: 'Task deleted!'
            })
        }
    })
}