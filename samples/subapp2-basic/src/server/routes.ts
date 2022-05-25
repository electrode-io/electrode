import { MainBody, Products, Footer, Header } from "../app";
import { PageRenderer } from "@xarc/react";
import { ElectrodeFastifyInstance } from "@xarc/fastify-server";
/**
 * Fastify plugin to setup application routes
 *
 * @param server - fastify server, should not have started yet
 * @returns nothing
 */

const subApps = [
  { name: Header.name, ssr: true },
  { name: MainBody.name, ssr: true },
  { name: Footer.name, ssr: true },
];

const pages = [ 
  { pageTitle: "Home", url: "/", subApps }, 
  { pageTitle: "Products", url: "/products", subApps } 
];

export async function fastifyPlugin(server: ElectrodeFastifyInstance) {

  // const createRoutes = (page) => {
  //   const { pageTitle, url, subApps } = page;
  //   const appRenderer: PageRenderer = new PageRenderer({
  //     pageTitle,
  //     subApps
  //   });
  //   server.route({
  //     method: "GET",
  //     url,
  //     async handler(request, reply) {
  //       try {
  //         const context = await appRenderer.render({ request });
  //         reply.type("text/html");

  //         if (context.user.cspHeader) {
  //           reply.header(`content-security-policy`, context.user.cspHeader);
  //         }

  //         reply.send(context.result);
  //       } catch (error) {
  //         reply.send(error.stack);
  //       }
  //     },
  //   });
  // }

  // return pages.forEach(page => createRoutes(pages));

  const homeRenderer: PageRenderer = new PageRenderer({
    pageTitle: "Xarc React 18 - Home",
    subApps
  });


  const productRenderer: PageRenderer = new PageRenderer({
    pageTitle: "Xarc React 18 - Product",
    subApps
  });

  server.route({
    method: "GET",
    url: "/",
    async handler(request, reply) {
      try {
        const context = await homeRenderer.render({ request });
        reply.type("text/html");

        if (context.user.cspHeader) {
          reply.header(`content-security-policy`, context.user.cspHeader);
        }

        reply.send(context.result);
      } catch (error) {
        reply.send(error.stack);
      }
    },
  });

  server.route({
    method: "GET",
    url: "/products",
    async handler(request, reply) {
      try {
        const context = await productRenderer.render({ request });
        reply.type("text/html");

        if (context.user.cspHeader) {
          reply.header(`content-security-policy`, context.user.cspHeader);
        }

        reply.send(context.result);
      } catch (error) {
        reply.send(error.stack);
      }
    },
  });
}
