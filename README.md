# Electrode App Confippet 

## Quickstart guide

- Confippet is built-in to electrode. 
- Scaffold an electrode app using the following commands: 

```
npm install -g yo
npm install -g generator-electrode
yo electrode
```

- Once the scaffolding is complete, open the following config files: 

```
config
|_ default.json
|_ development.json
|_ production.json
```

- Update and/or add your configuration settings 
- Start server: 

```
export NODE_ENV=production
gulp hot
```