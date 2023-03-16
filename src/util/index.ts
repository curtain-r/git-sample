import { inflate } from 'pako';
import { Author } from '../type';
export const compress = (U8: pako.Data) => {
    return inflate(U8, { to: 'string' })
}
export const parseU8ToString = (U8: Uint8Array) => {
    let str = '';
    for (const cc of U8) {
        str += String.fromCharCode(cc);
    }
    return str;
}
export const normalizeNewlines = (str: string) => {
    str = str.replace(/\r/g, '')
    str = str.replace(/^\n+/, '')
    str = str.replace(/\n+$/, '') + '\n'
    return str
}
export const indent = (str: string) => str
    .trim()
    .split('\n')
    .map(x => ' ' + x)
    .join('\n') + '\n'

export const outdent = (str: string) => str
    .split('\n')
    .map(x => x.replace(/^ /, ''))
    .join('\n')

export const parseAuthor = (authorStr: string): Author => {
    const parseTimezoneOffset = (offset: string) => {
        let res = offset.match(/(\+|-)(\d\d)(\d\d)/)
        if(!res) {
            throw Error('parse Author error');
        }
        const m = (res[1] === '+' ? 1 : -1) * (Number(res[2]) * 60 + Number(res[3]))
        return '' + negateExceptForZero(m)
    }

    const negateExceptForZero = (n: number) => {
        return n === 0 ? n : -n
    }
    // const [name, email, timestamp, offset] = authorStr.match(
    //     /^(.*) <(.*)> (.*) (.*)$/
    // )
    const res = authorStr.match(
            /^(.*) <(.*)> (.*) (.*)$/
        )
    if(!res) {
        throw Error('parse Author error');
    }
    return {
        name: res[1],
        email: res[2],
        timestamp: Number(res[3]),
        timezoneOffset: parseTimezoneOffset(res[4]),
    }
}
export const formatAuthor = ({ name, email, timestamp, timezoneOffset }: Author) => {
    const formatTimezoneOffset = (minutes: string) => {
        const sign = simpleSign(negateExceptForZero(+minutes))
        let m = Math.abs(+minutes)
        const hours = Math.floor(m / 60)
        m -= hours * 60
        let strHours = String(hours)
        let strMinutes = String(minutes)
        if (strHours.length < 2) strHours = '0' + strHours
        if (strMinutes.length < 2) strMinutes = '0' + strMinutes
        return (sign === -1 ? '-' : '+') + strHours + strMinutes
    }
    const negateExceptForZero = (n: number) => {
        return n === 0 ? n : -n
    }

    const simpleSign = (n: number) => Math.sign(n) || (Object.is(n, -0) ? -1 : 1)

    timezoneOffset = formatTimezoneOffset(timezoneOffset)
    return `${name} <${email}> ${timestamp} ${timezoneOffset}`
}


