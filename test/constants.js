module.exports = {
    context: {
        methods: {
            create: 'create',
            update: 'update',
            patch: 'patch',
            get: 'get',
            remove: 'remove',
            find: 'find'
        },
        types: {
            before: 'before',
            after: 'after',
            error: 'error'
        }
    }
};