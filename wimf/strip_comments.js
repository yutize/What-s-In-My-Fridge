const fs = require('fs');

const files = [
  'app/pages/dashboard/dashboard.tsx',
  'app/pages/ingredients/ingredients.tsx',
  'app/pages/nutrition/nutrition.tsx',
  'app/pages/recipes/recipes.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove {/* ... */} comments
    content = content.replace(/\{?\/\*.*?\*\/\}/gs, '');
    
    // Remove block comments /* ... */
    content = content.replace(/\/\*.*?\*\//gs, '');
    
    // Remove single line comments // ... but ONLY if it's the start of the line (ignoring whitespace)
    // We don't want to match http:// or https://
    content = content.replace(/^\s*\/\/.*$/gm, '');
    
    // Clean up multiple empty lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(file, content);
    console.log(`Cleaned ${file}`);
  }
});
