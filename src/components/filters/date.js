export default function(num) {
    num= num*1000;
    const date = new Date(Number(num));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    let dateString = Y + M + D;
    return dateString
}