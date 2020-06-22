async function main(){
  const server = await require("@xarc/fastify-server")({
      deferStart: true,
      connection: { port: 3002, host: "localhost" }
    });
    server.route({
      method: "GET",
      path: "/",
      handler: async () => "Hello World"
    });
    const WebApp = require("./dist/index.js");
console.log(WebApp);
    const renderer = WebApp.makeRouteHandler({
      templateFile: require("path").resolve(__dirname, 
	"../../subapp-server/resources/index-page.js")
    });	
debugger;


    server.listen(3002);	
}

main().then( _ => console.log("run sever on 3002")).catch(err=>console.log(err));
