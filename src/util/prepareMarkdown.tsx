export const prepareMarkdown = (string: string | undefined) => {
    let stringifiedElement = string
        ?.replaceAll(/\n+/g,'\n\n')
        ?.replaceAll(/`{3} *\n/g, '```')
        ?.replaceAll(/\n *`{3}/g, '```')
        ;

    return stringifiedElement;
}
