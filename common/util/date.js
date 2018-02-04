let LocalDate = Java.type('java.time.LocalDate');
let Instant = Java.type('java.time.Instant');
let ZoneId = Java.type('java.time.ZoneId');
let LocalDateTime = Java.type('java.time.LocalDateTime');
let DateTimeFormatter = Java.type('java.time.format.DateTimeFormatter');

function nowWithTime() {
  return LocalDateTime.now();
}

function now() {
  return LocalDate.now();
}

function nowToString(pattern) {
  return nowWithTime().format(DateTimeFormatter.ofPattern(pattern || "yyyy-MM-dd HH:mm"));
}

function excelDateToLocalDate(date) {
  if (!date) return date;
  let diasAntesDaUnixEpoch = 70 * 365 + 19;
  let diaEmMilesegundo = 86400;
  let numeroQueNaoSeiOSignificadoParaAFormula = 1000; // :)
  let dataEmMileSegundos = Math.round((date - diasAntesDaUnixEpoch) * diaEmMilesegundo * numeroQueNaoSeiOSignificadoParaAFormula);
  //setei o timezone para não diminuir 3 horas da data
  let zone = ZoneId.of('UTC-0000');
  // não utilizei o Date do javascript por causar PSQLException: ERROR: time zone "gmt-0300" not recognized
  return Instant.ofEpochMilli(dataEmMileSegundos).atZone(zone).toLocalDate();
}


exports = {
  now: now,
  nowWithTime: nowWithTime,
  nowToString: nowToString,
  excelDateToLocalDate: excelDateToLocalDate,
};
