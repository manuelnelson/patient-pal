'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _userValidation = require('../config/user-validation');

var _userValidation2 = _interopRequireDefault(_userValidation);

var _controllers = require('../controllers');

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _multerS = require('multer-s3');

var _multerS2 = _interopRequireDefault(_multerS);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap


var s3 = new _awsSdk2.default.S3();
var upload = (0, _multer2.default)({
  storage: (0, _multerS2.default)({
    s3: s3,
    bucket: 'practice-pal',
    acl: 'public-read',
    metadata: function metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

router.route('/professional/:personId')
/** POST /api/users - Create new user */
// .post(AuthCtrl.verifyToken,ClientCtrl.uploadPhoto);
.post(upload.single('image'), _controllers.ProfessionalCtrl.uploadPhoto);

// router.route('/client/:personId')
//   /** POST /api/users - Create new user */
//   .post(ClientCtrl.uploadPhoto);

/** Load user when API with userId route parameter is hit */
router.param('personId', _controllers.ProfessionalCtrl.load);
router.param('userId', _controllers.ClientCtrl.load);

exports.default = router;
//# sourceMappingURL=photo-routes.js.map