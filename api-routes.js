let router = require('express').Router()
router.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'It works :)'
    })
})

let controller = require('./controller')
router.route('/todo')
    .get(controller.index)
    .post(controller.new)

router.route('/todo/:id')
    .get(controller.view)
    .put(controller.update)
    .delete(controller.delete)

module.exports = router