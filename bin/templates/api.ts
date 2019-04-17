/* tslint:disable: no-console */

export function baseContentTemplate(version: string, content: string) {
  return (
    "" +
    `/* tslint:disable: class-name object-literal-sort-keys */

///////////////////////////////////////////////////////
//  IMPORTANT: this file is generated, dont edit it
/////////

import VastElement from '../../src/vast-element';

${content}

export { apiv${version} };
`
  );
}

export function validatorTemplate(version: string, validator: any) {
  return (
    "" +
    `/* tslint:disable: variable-name object-literal-sort-keys */

///////////////////////////////////////////////////////
//  IMPORTANT: this file is generated, dont edit it
/////////

export const vastValidator${version} = ${JSON.stringify(validator)};
`
  );
}

export function classTemplate(
  className: string,
  parentName: string,
  methods: string,
  isFirst: boolean
): string {
  // TODO isFirst should return this on overload and()
  // const isFirstContent = isFirst ? " || this" : "";
  return methods
    ? "" +
        `class ${className} extends VastElement<${parentName}> {${methods}
}
`
    : `class ${className} extends VastElement<${parentName}> {}
`;
}

export function attachMethodTemplate(
  methodName: string,
  args: string,
  argsWithTypes: string,
  childClass: string,
  infos: any
): string {
  const comma = args ? "," : "";
  // console.log(infos);
  // console.log(args);
  return (
    "" +
    `
  public attach${methodName}(${argsWithTypes}): ${childClass} {
    const newElem = new ${childClass}('${methodName}', this, ${infos}${comma} ${args});
    this.childs.push(newElem);
    return newElem;
  }`
  );
}

export function addMethodTemplate(
  methodName: string,
  args: string,
  argsWithTypes: string,
  className: string
): string {
  return (
    "" +
    `
  public add${methodName}(${argsWithTypes}): ${className} {
    return this.attach${methodName}(${args}).and();
  }`
  );
}

export function getArgsTemplate(
  hasContent: boolean,
  hasAttrs: boolean
): string {
  let args = "";
  // const attributesType = JSON.stringify(currentAttrs);
  if (hasContent) {
    args = "content";
    if (hasAttrs) {
      args += ", attributes";
    }
  } else if (hasAttrs) {
    args = "attributes";
  }
  return args;
}

export function getArgsTemplateWithTypes(
  hasContent: boolean,
  hasAttrs: boolean,
  attrsTypes: string,
  requiredAttribute: boolean
): string {
  let args = "";
  const opt = requiredAttribute ? "" : ""; // "?";
  const defaultValue = requiredAttribute ? "" : " = {}";
  // const attributesType = JSON.stringify(currentAttrs);
  if (hasContent) {
    args = "content: string";
    if (hasAttrs) {
      args += `, attributes${opt}: ${attrsTypes}${defaultValue}`;
    }
  } else if (hasAttrs) {
    args = `attributes${opt}: ${attrsTypes}${defaultValue}`;
  }
  return args;
}