const files = readdirSync(path);
files.reduce((acc, curr) => {
    const file = JSON.parse(readFileSync(path.join(path, curr), 'utf8'));
    const merged = {...acc, ...file };

    // Check for destructive merging.
    if (Object.keys(file).length + Object.keys(acc).length > Object.keys(merged).length) {
        throw Error('Destructive merge of JSON files.');
    }

    return merged;
}, {});