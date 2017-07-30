# feathers-hooks-common2

Common, reusable hooks for feathers services which are not available in the main [feathers-hooks-common](https://github.com/feathersjs/feathers-hooks-common) respository.

## Installation

    npm install feathers-hooks-common2

## Hooks

- [disableMultiItemCreate](#disableMultiItemCreate)
- [validateJoi](#validateJoi)

### disableMultiItemCreate<a name="disableMultiItemCreate"></a>

#### `disableMultiItemCreate()` [source](https://github.com/shreyjain1994/feathers-hooks-common2/blob/master/lib/disableMultiItemCreate.js)

Prevents the create method from creating multiple resources at once.

### validateJoi<a name="validateJoi"></a>

#### `validateJoi(schema, property, [options])` [source](https://github.com/shreyjain1994/feathers-hooks-common2/blob/master/lib/validateJoi.js)

**Params**

- schema - The Joi schema.
- property <code>string</code> - The property on the hook's context object that will be validated.
Dot notation is supported to represent sub-properties (i.e. params.query).
- [options] <code>object</code>
    - [.joi] <code>object</code> - The joi library that will be used for validation. This option is provided
in case your application requires the use of a particular version of the joi library. Defaults to
whatever version is attained with require('joi').
    - [.preCompile] <code>boolean</code> - Whether to precompile the joi schema. Precompiling will make subsequent
validations faster. Defaults to true.
    - [.error] <code>function</code> - The error to throw on validation failure. Defaults to a BadRequest(400) error.


## License

MIT.
