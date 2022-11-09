const router = require('express').Router();
const Repository = require('../models/Repository.model');
const logger = require('../../utils/logger.util');

router.get(
    '/',
    async (req, res) => {
        try {
            logger.info('Getting all repositories');
            const repoList = await Repository.find({});

            if(repoList.length === 0) {
                return res.status(404).json({
                    api: { error: 'No repos found' }
                });
            }

            const response = {
                api: {
                    repositories: repoList
                }
            }

            res.status(200).json(response);
        } catch(error) {
            logger.info(error);
            return res.status(400).json({ message: error });
        }
    }
);

router.get(
    '/:name',
    async (req, res) => {
        logger.info('Getting a single repository');
        const { name } = req.params;

        try {
            const repo = await Repository.find({ name }).exec();
    
            if(repo.length > 0) {
                const response = {
                    api : { repo }
                }
                
                logger.info(`${name} found`);
                res.status(200).json(response);
            } else {
                res.status(404).json({ api: { message: 'Not found' } })
            }
        } catch(error) {
            res.status(400).json({ api: error });
        }
    }
);

router.post(
    '/',
    async (req, res) => {
        logger.info('Creating new repository');

        if(!req.body.repository) return res.status(400).json({ api: {
            error: 'Missing repository'
        }});

        const { name } = req.body.repository;
        if(!name) return res.status(400).json({ api: {
            error: 'Missing name'
        }});

        try {
            const repo = new Repository({ name });

            const saved = await repo.save();

            res.status(201).json({ api: {
                repository: saved
            }});
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
);

module.exports = router;