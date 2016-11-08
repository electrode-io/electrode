module.exports = function jsonTree(json) {

  var modules = json.chunks[0].modules
  var maxDepth = 1;
  var rootSize = 0;

  var root = {
    children: [],
    name: 'root'
  };

  modules.forEach(function addToTree(module) {
    var size;

    if (module.source) {
      size = module.source.length;
    } else {
      size = module.size;
    }

    rootSize += size;

    var mod = {
      id: module.id,
      fullName: module.name,
      size: size,
      reasons: module.reasons
    };

    var depth = mod.fullName.split('/').length - 1;
    if (depth > maxDepth) {
      maxDepth = depth;
    }

    var fileName = mod.fullName;

    var beginning = mod.fullName.slice(0, 2);
    if (beginning === './') {
      fileName = fileName.slice(2);
    }

    getFile(mod, fileName, root);
  });

  root.maxDepth = maxDepth;
  root.size = rootSize;

  return root;
}


function getFile(module, fileName, parentTree) {
  var charIndex = fileName.indexOf('/');

  if (charIndex !== -1) {
    var folder = fileName.slice(0, charIndex);
    if (folder === '~') {
      folder = 'node_modules';
    }

    var childFolder = getChild(parentTree.children, folder);
    if (!childFolder) {
      childFolder = {
        name: folder,
        children: []
      };

      parentTree.children.push(childFolder);
    }

    getFile(module, fileName.slice(charIndex + 1), childFolder);
  } else {
    module.name = fileName;
    parentTree.children.push(module);
  }
}

function getChild(arr, name) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return arr[i];
    }
  }
}

function dirsizes(child) {
  return child.size = "size" in child
    ? child.size
    : child.children.reduce(function(size, child) {
        return size + ("size" in child ? child.size : dirsizes(child))
      }, 0);
}

