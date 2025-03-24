export const applyMarkup = (string: string) => {
    let stringifiedElement = string
        .replaceAll(/_([^_]+)_/g, '<u>$1</u>')
        .replaceAll(/\*([^*]+)\*/g, '<i>$1</i>')
        .replaceAll(/\*\*([^*]+)\*\*/g, '<emph>$1</emph>')
        .replaceAll(/```[\t ]*\n([^``]+)```/g, '<div class="codeblock">$1</div>')
        .replaceAll(/`([^`]+)`/g,'<code>$1</code>')
        .replaceAll(/([^\n]+)\n+/g,'<p>$1</p>')
        .replace(/<\/p>([^<]+)$/,'</p><p>$1</p>') // last par
        .replaceAll(/\t/g,'&emsp;')
        .replaceAll(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        ;

    return (
        <div dangerouslySetInnerHTML={{__html: stringifiedElement}}></div>
    );
}