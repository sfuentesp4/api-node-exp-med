// add-non-null-assertions.js
const fs = require('fs');
const path = require('path');

const modelsDir = './src/entities'; // Directorio donde están las entidades generadas

fs.readdirSync(modelsDir).forEach(file => {
    if (file.endsWith('.ts')) {
        const filePath = path.join(modelsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        content = content.replace(
            /(@(?:OneToMany|ManyToOne|ManyToMany|OneToOne)\([\s\S]*?\))\n\s+(\w+): (\w+(?:<[^>]+>)?(?:\[\])?);/g,
            '$1\n  $2!: $3;'
        );

        // 2. Maneja propiedades normales (@Column, etc.)
        content = content.replace(
            /(@(?:Column|PrimaryGeneratedColumn|.*?).*?\))\n\s+(\w+): ([\w\s|<>]+);/g,
            '$1\n  $2!: $3;'
        );

        fs.writeFileSync(filePath, content, 'utf8');
    }
});