export const secondsToDisplayTime = (seconds: number) => {
    let result = '';

    if ( seconds > 3600 ) {
        const hours = Math.floor(seconds / 3600);
        result += String(hours).padStart(2,'0') + ':';
        seconds = seconds % 3600;
    }

    if ( seconds > 60 ) {
        const minutes = Math.floor(seconds / 60);
        result += String(minutes).padStart(2,'0') + ':';
        seconds = seconds % 60;
    } else {
        result += '00:';
    }

    result += String(Math.floor(seconds)).padStart(2, '0');

    return result;
}