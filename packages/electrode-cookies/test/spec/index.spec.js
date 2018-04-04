"use strict";

/* eslint-disable quotes, max-len */

const electrodeServer = require("electrode-server");
const superAgent = require("superagent");
const Cookies = require("../../");
const CookieParser = require("set-cookie-parser");
const _ = require("lodash");
const expect = require("chai").expect;

function makeConfig() {
  return {
    services: {
      autoInit: false,
      autoDiscovery: false
    },
    plugins: {
      "electrode-cookies/hapi-plugin": {
        register: require("../../hapi-plugin.js")
      }
    }
  };
}

describe("cookies", function() {
  this.timeout(5000);

  let currentServer;

  const startServer = config => {
    return electrodeServer(config).tap(server => {
      currentServer = server;
    });
  };

  afterEach(done => {
    if (currentServer) {
      currentServer.stop(err => {
        currentServer = undefined;
        done(err);
      });
    } else {
      done();
    }
  });

  it("should set cookie", () => {
    const handler = (request, reply) => {
      Cookies.set("test", "bar", {
        path: "/",
        expires: 0,
        secure: true,
        domain: ".walmart.com",
        httpOnly: false,
        request
      });
      Cookies.set("test2", "bar2", {
        path: "/test",
        expires: 1000,
        secure: false,
        domain: "x.walmart.com",
        httpOnly: true,
        request
      });
      Cookies.set("test3", "bar3", {
        expires: 50000,
        secure: false,
        request
      });
      Cookies.set("test4", "bar4", { request });
      Cookies.expire("test5", { request });
      Cookies.set("($;enc:)", "(i$xx:x;)", {
        expires: 50000,
        secure: false,
        request
      });
      Cookies.set("----", { test: "12345", flag: true }, { request });
      const test1 = Cookies.get("test1", { request });
      Cookies.set("affiliate", "reflectorid=123:wmlspartner=wmlspartnerID:lastupd=9876630", {
        strictHeader: false,
        skipEncoding: true,
        request
      });
      Cookies.set("reflector", `"reflectorid=9834123:lastupd=98765:firstcreate=87654"`, {
        strictHeader: false,
        skipEncoding: true,
        request
      });
      Cookies.set("($!enc:)", "(i$xx:x)", {
        expires: 50000,
        secure: false,
        strictHeader: false,
        skipEncoding: true,
        request
      });
      Cookies.set("plusforwardslash", "+/", {
        strictHeader: false,
        forceAuthEncoding: true,
        request
      });
      reply({ test1, now: Date.now() });
    };

    const serverConfig = makeConfig();

    return startServer(serverConfig)
      .then(server => {
        server.route({
          method: "get",
          path: "/test",
          handler
        });

        return new Promise((resolve, reject) => {
          superAgent("http://localhost:3000/test")
            .set("cookie", "test1=hello")
            .end((err, response) => {
              return err ? reject(err) : resolve(response);
            });
        });
      })
      .then(response => {
        expect(response.body).to.have.keys(["test1", "now"]);
        expect(response.headers["set-cookie"]).to.be.an("array").with.length(11);

        const cookies = CookieParser.parse(response.headers["set-cookie"]);

        const verifyCookie = data => {
          const c = _.find(cookies, x => x.name === data.name);
          expect(c, `No cookie found with name "${data.name}"`).to.exist;
          if (data.hasOwnProperty("maxAge")) {
            const expires = data.maxAge > 0 ? response.body.now + data.maxAge * 1000 : 0;
            expect(Math.abs(c.expires.getTime() - expires) < 5, "Cookie expires should match");
            delete c.expires;
          }
          expect(
            _.pick(c, "name", "value", "path", "maxAge", "domain", "secure", "httpOnly")
          ).to.deep.equal(data);
        };

        verifyCookie({
          name: "test",
          value: "bar",
          path: "/",
          maxAge: 0,
          domain: ".walmart.com",
          secure: true
        });
        verifyCookie({
          name: "test2",
          value: "bar2",
          path: "/test",
          maxAge: 1000,
          domain: "x.walmart.com",
          httpOnly: true
        });
        verifyCookie({
          name: "test3",
          value: "bar3",
          path: "/",
          maxAge: 50000
        });
        verifyCookie({
          name: "test4",
          value: "bar4",
          path: "/"
        });
        verifyCookie({
          name: "test5",
          value: "x",
          path: "/",
          maxAge: 0
        });
        verifyCookie({
          name: "%28$%3Benc%3A%29",
          value: "(i%24xx%3Ax%3B)",
          path: "/",
          maxAge: 50000
        });
        verifyCookie({
          name: "----",
          value: "{%22test%22%3A%2212345%22%2C%22flag%22%3Atrue}",
          path: "/"
        });
        verifyCookie({
          name: "affiliate",
          value: "reflectorid=123:wmlspartner=wmlspartnerID:lastupd=9876630",
          path: "/"
        });
        verifyCookie({
          name: "reflector",
          value: `"reflectorid=9834123:lastupd=98765:firstcreate=87654"`,
          path: "/"
        });
        verifyCookie({
          name: "($!enc:)",
          value: "(i$xx:x)",
          path: "/",
          maxAge: 50000
        });
        verifyCookie({
          name: "plusforwardslash",
          value: "%2B%2F",
          path: "/"
        });

        expect(response.body.test1).to.equal("hello");
      });
  });

  it("should get cookie", () => {
    const handler = (request, reply) => {
      try {
        expect(Cookies.get("test", { request })).to.equal("bar");
        expect(Cookies.get("test2", { request })).to.equal("bar2");
        expect(Cookies.get("test3", { request })).to.equal("bar3");
        expect(Cookies.get("test4", { request })).to.equal("bar4");
        expect(Cookies.get("test5", { request })).to.equal("");
        expect(Cookies.get("($;enc:)", { request })).to.equal("(i$xx:x;)");
        expect(Cookies.get("----", { request })).to.equal(`{"test":"12345","flag":true}`);
        expect(Cookies.get("qwer", { request })).to.equal(undefined);
        expect(Cookies.get("AID", { request })).to.equal(
          "wmlspartner=wmtlabs:reflectorid=0085370:lastupd=146984"
        );
        expect(Cookies.get("com.wm.reflector", { request })).to.equal(
          "wmlspartner:abcd@lastupd:456@reflectorid:qwerty"
        );
        reply({ now: Date.now() });
      } catch (err) {
        reply(err.toString()).code(500);
      }
    };

    const serverConfig = makeConfig();

    return startServer(serverConfig).then(server => {
      server.route({
        method: "get",
        path: "/test",
        handler
      });

      return new Promise((resolve, reject) => {
        superAgent("http://localhost:3000/test")
          .set(
            "cookie",
            'com.wm.reflector="wmlspartner:abcd@lastupd:456@reflectorid:qwerty";AID=wmlspartner%3Dwmtlabs%3Areflectorid%3D0085370%3Alastupd%3D146984;test=bar;test2=bar2;test3=bar3;test4=bar4;test5=;%28$%3Benc%3A%29=(i%24xx%3Ax%3B);----={%22test%22%3A%2212345%22%2C%22flag%22%3Atrue};'
          ) // eslint-disable-line
          .end(err => {
            return err ? reject(err) : resolve();
          });
      });
    });
  });

  it("should get cookie by matching substring", () => {
    const handler = (request, reply) => {
      try {
        expect(Cookies.get("te", { matchSubStr: true, request })).to.deep.equal({
          test: "bar",
          test2: "bar2",
          test3: "bar3",
          test4: "bar4",
          test5: ""
        });
        expect(Cookies.get("!$key", { skipEncoding: true, request })).to.equal("(i$xx:x;)");
        expect(Cookies.get("!$k", { matchSubStr: true, request })).to.deep.equal({
          "!$key": "(i$xx:x;)"
        });
        expect(
          Cookies.get("%25!$foo", { matchSubStr: true, skipEncoding: true, request })
        ).to.deep.equal({ "%25!$foo-key": "%%%%" });
        expect(Cookies.get("----", { request })).to.equal(`{"test":"12345","flag":true}`);

        expect(Cookies.get("qwer", { request })).to.be.undefined;
        expect(Cookies.get("AID", { request })).to.equal(
          "wmlspartner=wmtlabs:reflectorid=0085370:lastupd=146984"
        );
        expect(Cookies.get("com.wm.reflector", { request })).to.equal(
          "wmlspartner:abcd@lastupd:456@reflectorid:qwerty"
        );
        reply({ now: Date.now() });
      } catch (err) {
        reply(err.toString()).code(500);
      }
    };

    const serverConfig = makeConfig();

    return startServer(serverConfig).then(server => {
      server.route({
        method: "get",
        path: "/test",
        handler
      });

      return new Promise((resolve, reject) => {
        superAgent("http://localhost:3000/test")
          .set(
            "cookie",
            'com.wm.reflector="wmlspartner:abcd@lastupd:456@reflectorid:qwerty";AID=wmlspartner%3Dwmtlabs%3Areflectorid%3D0085370%3Alastupd%3D146984;test=bar;test2=bar2;test3=bar3;test4=bar4;test5=;!$key=(i%24xx%3Ax%3B);----={%22test%22%3A%2212345%22%2C%22flag%22%3Atrue};%25!$foo-key=%%%%'
          ) // eslint-disable-line
          .end(err => {
            return err ? reject(err) : resolve();
          });
      });
    });
  });

  it("should throw when request not passed in options", () => {
    expect(() => Cookies.set("test", "value")).to.throw();
  });
});
