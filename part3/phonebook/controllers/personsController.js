const Person = require('../models/person.js')

const getAll = ((req, res) => {
  Person.find({})
    .then(result => {
        res.json(result)
    })
    .catch(error => next(error))  
})

const addPerson = ((req, res) => {
    const body = req.body

    if(!body.name || !body.number)
    {
        return res.status(400).json({error: 'name or number missing'})
    }
    else
    {
        const person = new Person({name: body.name, number: body.number})
        person.save()
            .then(person => {
                res.json(person)
            })
            .catch(error => next(error))
    }
})

const deletePerson = ((req, res) => {
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end
        })
        .catch(error => next(error))
})

const updatePerson = ((req, res) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(req.params.id, {name, number}, {new: true, context: 'query'})
        .then(updatePerson => {
            res.json(updatePerson)
        })
        .catch(error => next(error))

})

module.exports = {getAll, addPerson, deletePerson, updatePerson};