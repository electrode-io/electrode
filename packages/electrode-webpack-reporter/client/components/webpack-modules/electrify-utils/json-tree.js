module.exports = function jsonTree(json) {
  const modules = json.chunks[0].modules;
  let maxDepth = 1;
  let rootSize = 0;
  const root = {
    children: [],
    name: "root"
  };

  const getChild = function (arr, name) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === name) {
        return arr[i];
      }
    }
  };

  const getFile = function (module, fileName, parentTree) {
    const charIndex = fileName.indexOf("/");

    if (charIndex !== -1) {
      let folder = fileName.slice(0, charIndex);
      if (folder === "~") {
        folder = "node_modules";
      }

      let childFolder = getChild(parentTree.children, folder);
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
  };

  const dirsizes = function (child) {
    return child.size = "size" in child
      ? child.size
      : child.children.reduce((size, child) => {
        return size + ("size" in child ? child.size : dirsizes(child));
      }, 0);
  };

  modules.forEach(
    function addToTree(module) {
    let size;

    if (module.source) {
      size = module.source.length;
    } else {
      size = module.size;
    }

    rootSize += size;

    const mod = {
      id: module.id,
      fullName: module.name,
      size,
      reasons: module.reasons
    };

    const depth = mod.fullName.split("/").length - 1;
    if (depth > maxDepth) {
      maxDepth = depth;
    }

    let fileName = mod.fullName;

    const beginning = mod.fullName.slice(0, 2);
    if (beginning === "./") {
      fileName = fileName.slice(2);
    }

    getFile(mod, fileName, root);
  });

  root.maxDepth = maxDepth;
  root.size = rootSize;

  return root;
};





