const router = require('express').Router();
const Document = require('../models/Document.model');
const logger = require('../../utils/logger.util');
const Repository = require('../models/Repository.model');
const validate = require('../utils/validation');

router.post(
    '/',
    async (req, res) => {
        const { error } = validate.document(req.body);
        if(error) return res.status(400).json({ api: {
            error: error.details[0].message
        }});

        let { name, repository } = req.body;
        name = name.toLowerCase();

        const exists = await Document.findOne({ name });
        if(exists) return res.status(400).json({ api: {
            error: 'Document already exists'
        }});

        let repo;

        try {
            repo = await Repository.findById(repository.id);
            if(!repo) return res.status(404).json({ api: {
                error: 'Document not found'
            }});
        } catch (error) {
            return res.status(400).json({ api: {
                error: 'Document id invalid'
            }});
        }

        try {
            const saved = await new Document({
                name,
                repository: repository.id
            }).save();

            repo.documents = repo.documents.concat(saved.id);
            await repo.save();

            res.status(201).json({ api: {
                document: saved
            }});
        } catch (error) {
            res.status(400).json({ api: { error} });
        }
    }
);

router.put(
    '/',
    async (req, res) => {
        const { error } = validate.update(req.body);
        if(error) return res.status(400).json({ api: {
            error: error.details[0].message
        }});

        const { id, fields } = req.body;
        let document;

        try {
            document = await Document.findById(id);
            if(!document) return res.status(404).json({ api: {
                error: 'Document not found'
            }});
        } catch (error) {
            return res.status(400).json({ api: {
                error: 'Document id invalid'
            }});
        }

        try {
            document.fields = fields;
            const saved = await document.save();

            res.status(200).json({ api: {
                document: saved
            }})
        } catch (error) {
            res.status(400).json({ api: { error } })
        }
    }
);

router.delete(
    '/:id',
    async (req, res) => {
        try {
            const deleted = await Document.findByIdAndDelete(req.params.id);
            if(!deleted) return res.status(404).json({ api: {
                error: 'Document not found'
            }});

            const repository = await Repository.findById(deleted.repository);

            repository.documents = repository.documents.filter((value) => value != req.params.id);
            await repository.save();

            res.status(204).end();
        } catch (error) {
            return res.status(400).json({ api: {
                error: 'Document id invalid'
            }});
        }
    }
);

module.exports = router;