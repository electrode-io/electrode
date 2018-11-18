# React Native and Over the Air

## Electrode Over the Air Server

Electrode Over the Air \(OTA\) is a Microsoft™ Code Push compatible server that provides automatic updates for mobile applications over-the-air.

### Prerequisites

* [Node v6 or greater](https://nodejs.org/en/download/current/)
* [Apache Cassandra](http://cassandra.apache.org/)
* [Apache Cassandra Getting Started Documentation](http://cassandra.apache.org/doc/latest/getting_started/index.html)
* [GitHub Account](http://github.com/) \(if using GitHub as auth provider\)

### Running Cassandra

Befor running Cassandra, we recommend that you research basic information about running and configuring Cassandra.

`sh $ curl http://apache.mirrors.hoobly.com/cassandra/3.9/apache-cassandra-3.9-bin.tar.gz | tar -xvzf - $ cd apache-cassandra-3.9/ $ ./bin/cassandra`

### Installation

At a minimum, install and run electrode-ota-server using the following commands. For most scenarios this is not complete. You will need to be sure to setup SSL, load balancing, and all other requirements for your environment.

```
  $ mkdir your_ota
  $ cd your_ota
  $ npm init
  $ npm install electrode-ota-server --save
  $ mkdir config
```

In the package.json file, add the following code so that the server, by default, will start with the production configuration. This can be overridden with NODE\_ENV.

```
"scripts":{
  "start":"NODE_ENV=production node node_modules/electrode-ota-server",
  "development":"NODE_ENV=development node node_modules/electrode-ota-server"

}
```

### Setting up OAuth

To use GitHub as an OAuth provider, you need to login to GitHub and add an OTA Application.

Step 1. Login to github and select Settings.

![](http://www.electrode.io/img/electrode-ota/1-Profile.png)

Step 2. Go to "Developer Settings" and select "OAuth applications".

![](http://www.electrode.io/img/electrode-ota/2-Register OAuth.png)

Step 3. Setup your application.  
Keep in mind protocols and URLs are important. Also you can set up a key for development also \(localhost.yourdomain.com\). Make sure that resolves for your machine, try adding it to your hosts file. If you don't have a public server running you can add use [http://localhost:9001/](http://localhost:9001/) for the homepage and authorization callback URL (for development only).

![](http://www.electrode.io/img/electrode-ota/3-Register OAuth.png)

Step 4. Wild celebration, or double check that everything is correct!  
Check your clientId and clientSecret. Keep your clientSecret secret \(avoid checking it into public github for example\).

![](http://www.electrode.io/img/electrode-ota/4-Review OAuth.png)

### Configure the OTA Server

Inside the configuration, create a `config/production.json` file. You must configure at least one environment. You can create different settings for production, testing, and development by creating separate JSON files for each environment.

In production, use TLS or HTTPS for the server. Setting TLS is outside the scope of this document.

The configurations are loaded using electrode-confippet. For additional information, see  [Confippet](https://github.com/electrode-io/electrode-confippet).

**Note** The variables that should be configured are &lt;%= variable %&gt;. The comments must be removed if using JSON.

```
{
    "plugins": {

        "electrode-ota-server-dao-cassandra": {
            "options": {
                //You can enter an array of cassandra "contactPoints" but you need at least one.
                // If you are running cassandra locally you can use "localhost".
                "contactPoints": [
                    "<%=cassandra.hosts%>"
                ],
                 //Optional - If your cassandra server does not require a password
                "username": "<%=cassandra.username%>",
                //Optional - If your cassandra server does not require a password
                "password": "<%=cassandra.password%>"
                //Optional the keyspace you want to run the server with, by default the keyspace is "wm_ota".
                "keyspace":"<%=cassandra.keyspace%>"
            }
        },
        //This allows for other fileservice mechanisms to be plugged in.  Currently the files are stored
        // in the cassandra db, but the could be stored in anything really, including the filesystem.
        "electrode-ota-server-fileservice-upload":{
              "options": {
                //this needs to be the url of your acquistion server.  It can be the same as your current
                // management server.  
                "downloadUrl": "http://<%=your_ota_server%>/storagev2/"
              }
        },
        "electrode-ota-server-auth": {
            "options": {
                "strategy": {
                    //Authentication Strategy.  The OTA uses [bell](http://github.com/hapijs/bell) for
                    //OAuth.  You can see the vendors and options there.  We test with github oAuth.

                    "github-oauth": {
                        "options": {
                            //A Cookie password otherwise a raondom one (Optional)
                            "password":"<%= another cookie password%>",
                             //This is true by default if not running https change to false.   You should run over https though
                            "isSecure":true,
                            //The callback hostname of your server.   If you are running behind a proxy,
                            //it may be different than what the server thinks it is. (Optional)
                            "location":"<%= the address of your server %>",
                            //Get the Oauth info from github.
                            "clientId": "<%=github oauth clientId%>",
                            "clientSecret": "<%=github oauth clientSecret%>"
                        }
                    },
                   "session": {
                        "options": {
                            //A Cookie password otherwise a raondom one (Optional)
                            "password":"<%= another cookie password%>",
                             //This is true by default if not running https change to false.   You should run over https though
                            "isSecure":true
                        }
                   }

                }
            }
        }
    }
}
```

OTA uses [bell](http://github.com/hapijs/bell) for oAuth you can look there for more configuration options.

### Running OTA

There are multiple ways to start OTA, however the easiest is to issue the following command.  

`$ npm start`

## Logging into your OTA Server.

To use the server, make the following modifications to your client \(iOS/Android\(tm\)\) app, along with setting up Apps with the OTA server. Your server can host multiple applications from multiple developers, and to manage these you can use Microsoft's code-push CLI.

### Using the Command Line

If want to manage your OTA Server using the CLI, follow these steps. Or you can use the Electrode OTA Desktop to do the same thing.

#### Installing the code-push-cli

```
 $ npm install code-push-cli -g
```

#### Register

You can only register once per GitHub account. So the first time each user would need to issue the following command:  
 `sh $ code-push register https://<%=your_ota_server%>`

#### Login

After registering, if you need to log back in or if your acccess-key is lost or expired, you can log back in using the following command:  
 `sh $ code-push login https://<%=your_ota_server%>`

#### Server Token

Your server token page should look like this.![](http://www.electrode.io/img/electrode-ota/NewToken.png)

#### Creating a CodePushDeploymentKey

```
$ code-push app add <%=YourAppName%>
```

Should result in something like

`sh Successfully added the "YourAppName" app, along with the following default deployments:`

`┌────────────┬───────────────────────────────────────┐ │ Name │ Deployment Key │`

`├────────────┼───────────────────────────────────────┤ │ Production │`

`4ANCANCASDASDKASASDASDASDASDASDASDAS- │`

`├────────────┼───────────────────────────────────────┤ │ Staging │`

`ASDASDASDASDASDASDASDASDASDASDASDASD- │`

`└────────────┴───────────────────────────────────────┘`

These are your deployment keys. You will need them in the next step.

## Changes to Your Application.

If you haven't setup your app for code-push,  follow Microsoft's guide to [setting up the client SDK for React](https://microsoft.github.io/code-push/docs/react-native.html) or [Cordova](https://microsoft.github.io/code-push/docs/cordova.html).

If needed, check out the [Code Push Demo App](https://github.com/Microsoft/react-native-code-push/tree/master/Examples/CodePushDemoApp).

### For IOS

Then add the following to the  `ios/<%=your_app_name%>/Info.plist` file. You can open this in `sh open ios/<%=your_app_name%>.xcodeprog`to edit.![](http://www.electrode.io/img/electrode-ota/Info-plist.png) or using your favorite text editor. `xml <key>CodePushDeploymentKey</key><string><%=your_deployment_key%></string><key>CodePushServerURL</key><string>http://<%=your_ota_server%></string>`  
If your OTA server is not running over HTTPS you will need to add an exception to it in the`ios/<%=your_app_name%>/Info.plist` file, or use Xcode to update the file. `xml <dict><key>NSAllowsArbitraryLoads</key><true/><key>NSExceptionDomains</key><dict><key><%=your_ota_server%></key><dict><key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key><true/></dict></dict></dict>`

### For Android

Modify `android/app/src/main/java/com/<%=your_app_name%>/MainApplication.java`

```
    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     **/
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new CodePush("<%=your_ota_deployment_key%>", this, BuildConfig.DEBUG, "<%=your_ota_server%>")
        );
    }
```

### Publishing \(React\)

To update the app over-the-air, see the Microsoft code-push docs for more information on how to add CodePush to your application.`sh $ cd your_client_app_dir $ code-push release-react <%=YourAppName%> ios --deploymentName <%=Staging|Production|Etc.%>`

## Electrode Over the Air Desktop

You can use either the Microsoft code-push-cli or Electrode OTA Desktop to manage your deployments. You can get the [installation file](https://github.com/electrode-io/electrode-ota-desktop/releases) from GitHub.

### Installation

Copy of the Electrode OTA icon to the Applications folder.

![](http://www.electrode.io/img/electrode-ota/DMG.png)

### Logging in

Use the token you viewed on the server token screen.![](http://www.electrode.io/img/electrode-ota/NewToken.png)

The host would be your OTA Server.![](http://www.electrode.io/img/electrode-ota/Login.png)



### Creating a New App to Manage

You will need an app to get the deployment keys.![](http://www.electrode.io/img/electrode-ota/GettingStarted.png)![](http://www.electrode.io/img/electrode-ota/NewAppSuccess.png)

### Creating a New Deployment

You can use Staging and Development or create your own, for your workflow.![](http://www.electrode.io/img/electrode-ota/NewDeployment.png)![](http://www.electrode.io/img/electrode-ota/NewDeployment1.png)

### Adding a New Release

To Upload a new release select the deployment and click release.![](http://www.electrode.io/img/electrode-ota/Releases.png)

### Adding Collaborators

If you need to share responsibility you can add a collaborator. However, they will need to [register as a user](http://www.electrode.io/docs/electrode_react_native_over_the_air_electron.html#user-content-register) first to be able to add them to your App.![](http://www.electrode.io/img/electrode-ota/Collaborate.png)

### New Key

If you loose a token key, or want one for you CI server you can manage them here.![](http://www.electrode.io/img/electrode-ota/AddKey.png)![](http://www.electrode.io/img/electrode-ota/NewKey.png)
