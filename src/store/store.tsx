import createFastContext from "../utils/fastContext";

const { Provider, useStore } = createFastContext({
  direction: "",
});

export { Provider, useStore };
