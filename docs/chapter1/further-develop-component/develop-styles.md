# Develop Styles

## Develop styles using CSS modules

Let's also add some style elements using [CSS modules](https://github.com/css-modules/css-modules) to create a dynamic application. Use the code below to update the .css file:

`<your-component>/packages/<componentName>/src/styles/<your-component>.css`:

```css

body {
  font-family: sans-serif;
}

p {
  padding: 15px;
}

@keyframes partyLights {
  0% {
    background-position: 0% 51%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 51%
  }
}

@keyframes shake {
  from {
    transform: scale3d(1, 1, 1);
  }
  10%, 20% {
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}

.party {
  animation-name: shake;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}

.hideParty {
  visibility: hidden;
}

.houseParty {
  -webkit-clip-path: polygon(2% 97%, 98% 97%, 98% 44%, 51% 8%, 3% 45%);
  clip-path: polygon(2% 97%, 98% 97%, 98% 44%, 51% 8%, 3% 45%);
  background: linear-gradient(269deg, #ff90f1, #27ff8f, #6db0ff, #a398ff);
  background-size: 800% 800%;
  animation: partyLights 5s ease infinite;
  min-height: 12em;
}

.house {
  clip-path: polygon(2% 97%, 98% 97%, 98% 44%, 51% 8%, 3% 45%);
  background-color: #474747;
  padding: 10em 2em 2em 2em;
  border-radius: 10px;
  min-height: 35vh;
}

.container {
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  position: relative;
  transition: filter .7s ease-in-out;
}

.container:before {
  content: '';
  display: block;
  position: absolute;
  background-image: url(//goo.gl/8f5GrX);
  background-position: center;
  background-size: 95%;
  background-repeat: no-repeat;
  width: 45%;
  height: 45%;
  z-index: 999;
  left: 47%;
  top: -9%;
}

.room {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2em;
  padding-right: 2.5em;
}

.message {
  display: block;
  position: absolute;
  width: 19em;
  height: 11em;
  z-index: 999;
  left: 4.5em;
  top: 7.5em;
  color: white;
  font-weight: 100;
  font-family: helvetica;
  font-size: 27px;
}

a, a:hover, a:active, a:visited {
  color: rgb(93, 245, 255);
  text-decoration: none;
}

```

Create a file named: `<your-component>/packages/<componentName>/src/styles/guest-list.css`. Copy the code from below into this file:

```css

@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
label {
  font-size: 2em;
}

input[type=checkbox] {
  display: none;
}

input[type=checkbox]+label:before {
  font-family: FontAwesome;
  display: inline-block;
}

input[type=checkbox]+label:before {
  content: "\f096";
}

input[type=checkbox]+label:before {
  letter-spacing: 10px;
}

input[type=checkbox]:checked+label:before {
  content: "\f046";
}

input[type=checkbox]:checked+label:before {
  letter-spacing: 5px;
}

.guestList {
  position: absolute;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.93);
  left: 10%;
  border: 2px solid whitesmoke;
  display: inline-block;
  padding-left: 4em;
  padding-right: 4em;
  padding-bottom: 3em;
  padding-top: 1.7em;
  border-radius: 3px;
  margin: 2em;
}

.guestList h1 {
  font-size: 2.5em;
}

.guestName {
  margin-bottom: .5em;
}

```

Create a file named: `<your-component>/packages/<componentName>/src/styles/render-friend.css`. Copy the code from below into this file:

```css

@keyframes shake {
  from {
    transform: scale3d(1, 1, 1);
  }
  10%, 20% {
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  to {
    transform: scale3d(1, 1, 1);
  }
}

.join {
  animation-name: shake;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.friend {
  border-radius: 50%;
  background-color: #efefef;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  float: right;
}

```
