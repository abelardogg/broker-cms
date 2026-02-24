const fs = require('fs');
const path = require('path');

// Lee los datos originales
const propertiesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../broker/scripts/data/properties.json'), 'utf8')
);

// Transforma los datos al formato de Strapi
const transformedProperties = propertiesData.map((prop) => ({
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
  publishedAt: new Date().toISOString(),
}));

console.log('Propiedades transformadas:', JSON.stringify(transformedProperties, null, 2));
console.log('\n\nTotal de propiedades:', transformedProperties.length);
console.log('\nPara importar estas propiedades:');
console.log('1. Copia el JSON de arriba');
console.log('2. Ve a http://localhost:1337/admin');
console.log('3. Content Manager > Properties');
console.log('4. Crea cada propiedad manualmente con estos datos');
console.log('\nO usa la API REST de Strapi para importar programáticamente.');
