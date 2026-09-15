import type { Schema, Struct } from '@strapi/strapi';

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'menu_item';
  };
  attributes: {
    category_ref: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'navigation.menu-item': NavigationMenuItem;
    }
  }
}
