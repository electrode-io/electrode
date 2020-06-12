export const prepare = modcall_param => {
  return {
    process(context) {
      return `load ${modcall_param} from ${context.folder} folder`;
    }
  };
};
