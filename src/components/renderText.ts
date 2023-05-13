function renderText(text: string): string {
    let output = text;

    // Unterstreichungen
    output = output.replace(/__(.*?)__/g, '<u>$1</u>');

    // Fettdruck
    output = output.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Kursiver Text
    output = output.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Zeilenumbrüche
    output = output.replace(/\n/g, '<br>');

    return output;
}

export {
    renderText
}
