import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/user-validation';
import { ClientCtrl, AuthCtrl, ProfessionalCtrl} from '../controllers';
const router = express.Router(); // eslint-disable-line new-cap
import aws from 'aws-sdk';
import multer from 'multer';
import multers3 from 'multer-s3';
import config from '../config';

let s3 = new aws.S3()
let upload = multer({
  storage: multers3({
    s3: s3,
    bucket: 'practice-pal',
    acl: 'public-read',
    metadata: (req,file,cb) => {
      cb(null, {fieldName: file.fieldname})
    },
    key: (req,file,cb) =>{
      cb(null, Date.now().toString())
    }
  })
})

router.route('/professional/:personId')
  /** POST /api/users - Create new user */
  // .post(AuthCtrl.verifyToken,ClientCtrl.uploadPhoto);
  .post(upload.single('image'),ProfessionalCtrl.uploadPhoto);
  
// router.route('/client/:personId')
//   /** POST /api/users - Create new user */
//   .post(ClientCtrl.uploadPhoto);

/** Load user when API with userId route parameter is hit */
router.param('personId', ProfessionalCtrl.load); 
router.param('userId', ClientCtrl.load); 

export default router;
