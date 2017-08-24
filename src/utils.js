export const days = [
  'SUN','MON','TUE','WED','THR','FRI','SAT'];

export const months = [
  'JAN','FEB','MAR','APR',
  'MAY','JUN','JUL','AUG',
  'SEP','OCT','NOV','DEC'];

export function dateToString(date) {
  const day = days[date.getDay()];
  const dd = date.getDate(); 
  const mm = months[date.getMonth()];
  const yyyy = date.getFullYear();
  const time = date.toTimeString();
  return (
    day + " " + dd + " " + mm + " " + yyyy + " " + time
  );
}