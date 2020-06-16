
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world'),
  exact: true,
  
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola'),
  exact: true,
  
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags'),
  exact: true,
  
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus'),
  exact: true,
  
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook'),
  exact: true,
  
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello'),
  exact: true,
  
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola'),
  exact: true,
  
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/community',
  component: ComponentCreator('/docs/community'),
  exact: true,
  
},
{
  path: '/docs/contributing',
  component: ComponentCreator('/docs/contributing'),
  exact: true,
  
},
{
  path: '/docs/getting-started',
  component: ComponentCreator('/docs/getting-started'),
  exact: true,
  
},
{
  path: '/docs/glossary',
  component: ComponentCreator('/docs/glossary'),
  exact: true,
  
},
{
  path: '/docs/welcome-to-electrode',
  component: ComponentCreator('/docs/welcome-to-electrode'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
