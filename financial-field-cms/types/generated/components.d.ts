import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleChatBubble extends Struct.ComponentSchema {
  collectionName: 'components_article_chat_bubbles';
  info: {
    displayName: 'Chat Bubble';
  };
  attributes: {
    message: Schema.Attribute.Text;
    position: Schema.Attribute.Enumeration<['left', 'right']>;
    speaker_avatar: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    speaker_name: Schema.Attribute.String;
    speaker_role: Schema.Attribute.String;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'Menu Item';
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
      'article.chat-bubble': ArticleChatBubble;
      'navigation.menu-item': NavigationMenuItem;
    }
  }
}
