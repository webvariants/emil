mixin component-name(options)
    - options = options || {};
    - options['option1'] = options.option1 || NULL;
    - options['option2'] = options.option2 || NULL;
    .component-name
        block
            block