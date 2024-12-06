export function h(tag, props, ...children) {
  const elem = document.createElement(tag);

  for (const prop in props) {
    elem.setAttribute(prop, props[prop]);
  }

  for (const child of children) {
    const nodes = Array.isArray(child) ? child : [child];
    for (const node of nodes) {
      if (node && node instanceof Element) {
        elem.appendChild(node);
      } else if (node != null) {
        elem.appendChild(document.createTextNode(node.toString()));
      }
    }
  }

  return elem;
}
