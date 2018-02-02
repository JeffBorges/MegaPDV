let LocalDate = Java.type('java.time.LocalDate');
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


exports = {
  now: now,
  nowWithTime: nowWithTime,
  nowToString: nowToString
};
