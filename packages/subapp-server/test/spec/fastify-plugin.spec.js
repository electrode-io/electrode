"use strict";

const {fastifyPlugin} = require('../../lib/fastify-plugin');
const Path = require("path");
var fastify = require("fastify")();


const setup = async function(){
    var opts = {
        srcDir: Path.join(__dirname, "../data/fastify-plugin-test"),
        loadRoutesFrom: "routes.js",
        stats: Path.join(__dirname, "../data/stats.json") // "dist/server/stats.json"
    
    }

    await fastifyPlugin(fastify, opts);

    fastify.listen(2333)
}


async function test(){
    await setup();

    fastify.inject({
        method: 'GET',
        url: '/'
      }, (err, response) => {
        console.log(response);
      });
}

test();

