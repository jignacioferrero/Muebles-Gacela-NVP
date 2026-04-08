import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, '../plantilla_productos.csv');
const outputPath = path.join(__dirname, '../data/productos.json');

// Ensure data dir exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

function generateSlug(name) {
  return name.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

try {
  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  // Split by newline
  const lines = fileContent.split(/\r?\n/).filter(line => line.trim() !== '');
  
  if (lines.length > 0) {
    // We try to detect the delimiter (can be , or ;)
    const firstLine = lines[0];
    const delimiter = firstLine.includes(';') ? ';' : ',';
    
    // Naive CSV parsing holding quotes might be needed if user uses quotes
    // But typically Excel exports with ; don't use quotes unless necessary.
    const headers = lines[0].split(delimiter).map(h => h.trim());
    
    const products = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        // Custom parser to handle delimiters inside quotes
        const values = [];
        let inQuotes = false;
        let currentValue = '';
        
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            
            if (char === '"') {
                inQuotes = !inQuotes; // Toggle quotes
            } else if (char === delimiter && !inQuotes) {
                // End of value
                values.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue); // Add the last value

        if (values.length < headers.length) continue;
        
        const obj = {};
        headers.forEach((header, index) => {
            let val = values[index] ? values[index].trim() : '';
            // If the inside value was actually \"hello\", the parser above didn't remove the outermost quotes if they existed 
            // wait, in the logic above, if it's "hello", currentValue is hello. The quotes were just toggled.
            // But wait, the quotes are skipped! 
            // Actually, my parser above `currentValue += char` when NOT quote. So quotes are naturally dropped! 
            // Let's ensure we don't drop internal quotes like "He said ""Hello""", but simpler is fine.
            obj[header] = val;
        });

        // Add extra computed fields
        const slugPrefix = obj['Nombre_Comercial'] ? generateSlug(obj['Nombre_Comercial']) : 'producto';
        const cleanSku = obj['SKU'] ? generateSlug(obj['SKU']) : 'gen';
        obj.slug = `${slugPrefix}-${cleanSku}`;

        products.push(obj);
    }
    
    fs.writeFileSync(outputPath, JSON.stringify({ products }, null, 2));
    console.log(`Catalog created successfully at ${outputPath} with ${products.length} products.`);
  }
} catch (error) {
  console.error("Error reading or processing CSV:", error.message);
}
