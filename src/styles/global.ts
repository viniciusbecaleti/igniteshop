import { globalCss } from ".";

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: "border-box"
  },

  'body, input, select, textarea, button': {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    fontSize: 16
  },

  body: {
    backgroundColor: "$gray900",
    color: "$gray100"
  }
})