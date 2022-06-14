const router = require('express').Router()
const Accounts = require('./accounts-model.js');

const { checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting accounts' })
    });
})

router.get('/:id', (req, res, next) => {
    Accounts.getById(req.params.id)
      .then(account => {
        if(account) {
          res.status(200).json(account)
        } else {
          res.status(404).json({ message: 'Account not found' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Error getting account' })
      });
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(account => {
      if(account) {
        res.status(200).json(account)
      } else {
        res.status(404).json({ message: 'Account not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating account' })
    })
});

router.delete('/:id', (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(account => {
      if(account) {
        res.status(200).json(account)
      } else {
        res.status(404).json({ message: 'Account not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting account' })
    });
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
