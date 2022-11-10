const router = require('express').Router();
const Repository = require('../models/Repository.model');
const logger = require('../../utils/logger.util');
const validate = require('../utils/validation');

router.get(
    '/',
    async (req, res) => {
        try {
            logger.info('Getting all repositories');
            const list = await Repository.find({}).populate('documents');

            if(list.length === 0) {
                return res.status(404).json({ api: {
                    error: 'No repos found'
                }});
            }

            res.status(200).json({ api: {
                respositories: list
            }});
        } catch(error) {
            return res.status(400).json({ error });
        }
    }
);

router.get(
    '/:name',
    async (req, res) => {
        const { error } = validate.name(req.params);
        if(error) return res.status(400).json({ api: {
            error: error.details[0].message
        }});

        let { name } = req.params;
        name = name.toLowerCase();

        try {
            const repository = await Repository.findOne({ name }).exec();

            res.status(200).json({ api: {
                repository
            }});
        } catch(error) {
            res.status(400).json({ api: { error } });
        }
    }
);

router.post(
    '/',
    async (req, res) => {
        const { error } = validate.name(req.body);
        if(error) return res.status(400).json({ api: {
            error: error.details[0].message
        }});

        let { name } = req.body;
        name = name.toLowerCase();

        const exists = await Repository.findOne({ name });
        if(exists) return res.status(400).json({ api: {
            error: 'Repository already exists'
        }});

        try {
            const saved = await new Repository({ name }).save();

            res.status(201).json({ api: {
                repository: saved
            }});
        } catch (error) {
            res.status(400).json({ api: { error } });
        }
    }
);

module.exports = router;