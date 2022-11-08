const router = require('express').Router();
const Document = require('../models/Document.model');
const logger = require('../../utils/logger.util');
const Repository = require('../models/Repository.model');

router.post(
    '/',
    async (req, res) => {
        logger.info('adding a document to the repository');
        logger.info(req.body);

        const { document, repository } = req.body;

        if(!document) return res.status(400).json({
            api: {
                message: 'Missing document'
            }
        });

        if(!repository) return res.status(400).json({
            api: {
                message: 'Missing repoistory'
            }
        });

        const repo = await Repository.findById(repository.id);
        if(!repo) return res.status(400).json({ api: {
            message: 'Cant find repository'
        }});

        const doc = new Document({
            name: document.name,
            repository: repo.id
        });

        try {
            const saved = await doc.save();

            repo.documents = repo.documents.concat(saved.id);
            await repo.save();

            logger.info('Document saved');
            res.status(201).json({ 
                api: { saved }
             });
        } catch (error) {
            res.status(400).json({
                api: { error}
            });
        }
    }
);

router.delete(
    '/:id',
    async (req, res) => {
        res.status(200).json({ message: 'deleting a document to the repository' });
    }
);

module.exports = router;