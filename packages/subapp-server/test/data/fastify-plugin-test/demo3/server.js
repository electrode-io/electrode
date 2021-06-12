module.exports = {
    setup(server) {
        server.route({
            path: "/api/demo3/testsetup",
            method: "GET",
            handler: function (request, reply) {
                reply.send({
                    msg: "Route set by subappServer"
                });
            }
        });
    }
};
