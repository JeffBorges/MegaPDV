let dateUtil = require('../common/util/date');


function requestFileStorage(request, name, type) {
  let reqFile = request.httpRequest.getPart('file');
  let fileName = name + '-' + dateUtil.nowToString('yyyyMMddHHmm') + '.' + type;

  let file = new java.io.File("/opt/softbox/MegaPDV/" + fileName).getAbsolutePath();
  reqFile.write(file);
  return file;
};

exports = {
  requestFileStorage: requestFileStorage
};
