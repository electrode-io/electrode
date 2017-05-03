# Add Examples

## Add Examples to Your Demo

Create a file named `<your-awesome-component>/demo/examples/render-friend.example`. Copy, paste and save the code below into this file:

```
<RenderFriend
  friend={
    {name: "John", img: "//goo.gl/dL5MXT"}
  } 
/>
```

Create a file named `<your-awesome-component>/demo/examples/guest-list.example`. Copy, paste and save the code below into this file:

```
<GuestList
  invitees={[
  {name: 'John Smith', invited: false},
  {name: 'Jane Smith', invited: false},
  {name: 'Dan Jones', invited: false}
  ]}
  toggleGuest={(invitee) => alert(invitee.name)}
/>
```

Navigate to `<your-awesome-component>/demo/examples/your-awesome-component.example`. Add the code below. Don't forget to change the references from the literal `YourAwesomeComponent`  to your actual component name:

```
<YourAwesomeComponent
  ourFriends={[
   {name: "electrode", img: "//goo.gl/CZ4wAF", size: 12},
   {name: "hapi", img: "//goo.gl/q9uIFW", size: 12},
   {name: "React", img: "//goo.gl/dL5MXT", size: 12},
  ]}

  invitees={[
   {name: "electrode", invited: false},
   {name: "hapi", invited: false},
   {name: "React", invited: false}
  ]}

  toggleGuest={(invitee) => alert('Edit invitees array in playground to invite a guest!')}

  message={(c)=>(

  <div className={c}>Change key 'invited' to true in 'invitees' array in the playground
  above to invite guests!</div>

  )}
/>
```

Now Navigate to `<your-awesome-component>/demo/demo.jsx`. Modify `const components`  to include your demo examples:

```
const components = [
  {
    title: "HouseParty",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/guest-list.example"),
        noRender: true
      }
    ]
  },
  {
    title: "RenderFriend",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/render-friend.example"),
        noRender: true
      }
    ]
  },
  {
    title: "YourAwesomeComponent",
    examples: [
      {
        type: "playground",
        code: require("raw!./examples/your-awesome-component.example"),
        noRender: true
      }
    ]
  }
];
```



