import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Lee los datos originales
const propertiesPath = path.join(__dirname, '../../broker/scripts/data/properties.json');
const propertiesData = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

async function importProperties() {
  console.log(`\n🚀 Importando ${propertiesData.length} propiedades a Strapi...\n`);

  for (const prop of propertiesData) {
    const propertyData = {
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
    };

    try {
      const response = await fetch(`${STRAPI_URL}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        console.log(`✅ Importada: ${propertyData.data.title}`);
      } else {
        const error = await response.text();
        console.error(`❌ Error importando ${propertyData.data.title}:`, error);
      }
    } catch (error) {
      console.error(`❌ Error importando ${propertyData.data.title}:`, error.message);
    }
  }

  console.log('\n✨ Importación completada!\n');
}

importProperties().catch(console.error);
