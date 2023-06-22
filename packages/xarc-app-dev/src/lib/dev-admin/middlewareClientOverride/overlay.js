/*eslint-env browser*/
const clientOverlay = document.createElement('div');
clientOverlay.id = 'hot-middleware-client-overlay';

const styles = {
  background: 'white',
  color: 'black',
  lineHeight: '1.6',
  whiteSpace: 'normal',
  fontFamily: 'Menlo, Consolas, monospace',
  fontSize: '16px',
  position: 'fixed',
  zIndex: 999999,
  padding: '50px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  overflow: 'auto',
  dir: 'ltr',
  textAlign: 'left',
};

for (const key in styles) {
  clientOverlay.style[key] = styles[key];
}

function showProblems(errorType, error) {
  clientOverlay.innerHTML = '';
  let errorContainers = [];

  function showErrorContainer(containerNumber){
    clientOverlay.textContent = '';
    clientOverlay.appendChild(errorContainers[containerNumber]);
  }

  errorContainers = error.map(msg => {
    const outputLines = msg.split("\n").filter(line => line.trim() !== "");
    const summary = outputLines.filter(line => !line.startsWith("\x1b") && !line.startsWith("    at"));
    const code = outputLines.filter(line => line.startsWith("\x1b"));
    const stackTrace = outputLines.filter(line => line.startsWith("    at"));
    const [errorMessage] = summary.splice(-1);
    return {code, summary, stackTrace, errorMessage}
  }).map((error, index, allErrors) => {
    const container = document.createElement('div');
    {
        const heading = document.createElement('h1');
        heading.style.fontSize = '20px';
        heading.style.textAlign = 'center';
        
        
        const prev = document.createElement('a');
        prev.textContent = "⇦";
        if(index > 0){
          prev.style.cursor = 'pointer';
        }
        prev.onclick = () => showErrorContainer(Math.max(0, index-1));
        heading.appendChild(prev);
      

        const text = document.createElement('span');
        text.innerText = `Showing error ${index + 1} of ${allErrors.length}`;
        heading.appendChild(text);
        
        const next = document.createElement('a');
        next.textContent = "⇨";
        if(index < allErrors.length-1){
          next.style.cursor = 'pointer';
        }
        next.onclick = () => showErrorContainer(Math.min(allErrors.length -1, index+1));
        heading.appendChild(next);
        

        container.appendChild(heading);
    }
    {
      const summary = document.createElement('div');
      summary.textContent = error.summary.join("\n");
      summary.style.color = 'red';
      summary.style.whiteSpace = 'pre';
      container.appendChild(summary);
    }
    {
        const codeContainer = document.createElement('div');
        codeContainer.style.border = "2px solid black";
        codeContainer.style.borderRadius = '20px';
        codeContainer.style.padding = '20px';
        codeContainer.style.backgroundColor = 'black';
        codeContainer.style.color = 'white';

        const errorMessage = document.createElement('div');
        errorMessage.textContent = error.errorMessage;
        codeContainer.appendChild(errorMessage);


        const line = document.createElement('hr');
        if(error.code.length !== 0) codeContainer.appendChild(line);

        const code = document.createElement('div');
        code.style.overflow = "scroll";
        code.innerHTML = require("ansi-html-community")(error.code.join("\n"));
        code.style.whiteSpace = 'pre';
        if(error.code.length !== 0) codeContainer.appendChild(code);

        
        container.appendChild(codeContainer);
    }
    {
        const stackTrace = document.createElement('details');
        stackTrace.style.whiteSpace = 'pre';
        stackTrace.style.fontSize = '12px';
        const stackTraceText = document.createElement('summary');
        stackTraceText.textContent = "Stack Trace";
        stackTrace.appendChild(stackTraceText);
        stackTrace.append(error.stackTrace.join("\n"));
        if(error.stackTrace.length !== 0) container.appendChild(stackTrace);
    }
    return container;
  });

  showErrorContainer(0);

  if (document.body) {
    document.body.appendChild(clientOverlay);
  }
}

function clear() {
  if (document.body && clientOverlay.parentNode) {
    document.body.removeChild(clientOverlay);
  }
}

module.exports = {
  showProblems: showProblems,
  clear: clear,
}