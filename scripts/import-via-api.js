const fs = require('fs');
const path = require('path');

// Lee los datos originales del proyecto broker
const propertiesPath = path.join(__dirname, '../../broker/scripts/data/properties.json');

if (!fs.existsSync(propertiesPath)) {
  console.error('Error: No se encontró el archivo properties.json');
  console.error('Ruta esperada:', propertiesPath);
  process.exit(1);
}

const propertiesData = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

console.log('\n=== DATOS TRANSFORMADOS PARA STRAPI ===\n');
console.log('Copia este JSON y úsalo para importar vía API o manualmente:\n');

const transformedProperties = propertiesData.map((prop) => ({
  data: {
    title: prop.address.street,
    slug: prop.slug,
    price: prop.price,
    description: prop.description,
    bedrooms: prop.bedrooms || 0,
    bathrooms: prop.bathrooms || 0,
    sqft: prop.sqft || 0,
    address: prop.address.street,
    city: prop.address.city,
    state: prop.address.state,
    zipCode: prop.address.zip,
    status: prop.status === 'for-sale' ? 'active' : 'pending',
    propertyType: prop.propertyType === 'single-family' ? 'residential' : 'land',
    featured: false,
    mls: prop.mlsNumber,
  },
}));

console.log(JSON.stringify(transformedProperties, null, 2));

console.log('\n\n=== INSTRUCCIONES DE IMPORTACIÓN ===\n');
console.log('OPCIÓN 1: Importar vía código');
console.log('Ejecuta: node scripts/import-via-strapi.js\n');

console.log('OPCIÓN 2: Importar vía API REST');
console.log('Para cada propiedad, ejecuta:');
console.log('curl -X POST http://localhost:1337/api/properties \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"data": {...}}\'');

console.log('\n\nOPCIÓN 3: Importar manualmente');
console.log('1. Ve a http://localhost:1337/admin');
console.log('2. Content Manager > Properties');
console.log('3. Crea cada entrada con los datos de arriba\n');
