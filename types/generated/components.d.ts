import type { Schema, Struct } from '@strapi/strapi';

export interface LoanFeature extends Struct.ComponentSchema {
  collectionName: 'components_loan_features';
  info: {
    description: 'Loan program feature item';
    displayName: 'Feature';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'loan.feature': LoanFeature;
    }
  }
}
