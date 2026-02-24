const fs = require('fs');
const path = require('path');

async function seedProperties() {
  const strapi = require('../src');

  // Lee los datos originales
  const propertiesData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, '../../broker/scripts/data/properties.json'),
      'utf8'
    )
  );

  console.log(`Importando ${propertiesData.length} propiedades...`);

  for (const prop of propertiesData) {
    try {
      const propertyData = {
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
        publishedAt: new Date(),
      };

      await strapi.entityService.create('api::property.property', {
        data: propertyData,
      });

      console.log(`✓ Importada: ${propertyData.title}`);
    } catch (error) {
      console.error(`✗ Error importando ${prop.address.street}:`, error.message);
    }
  }

  console.log('\n¡Importación completada!');
}

seedProperties()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error durante la importación:', error);
    process.exit(1);
  });
