export function applyStyle(element, css) {
    let styles = css
        .split(/\r?\n/)
        .filter(x => x.split(':').length > 1)
        .map(l => l.split(':'));
    styles.forEach(style => {
        element.style(style[0].trim(), style[1].replace(';', '').trim(';'));
    });
}
