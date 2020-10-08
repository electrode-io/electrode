export const prepare = modCallParam => {
  return {
    process(context) {
      return `load ${modCallParam} from ${context.folder} folder`;
    }
  };
};
