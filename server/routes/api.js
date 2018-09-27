/**
 * Created by haiming.zeng on 2017/12/8.
 */
const express = require('express');
const router = express.Router();
const Request = require('../requests/api.request');

router.all('/(:apiPath)?(/:apiType)?',Request.api);

module.exports = router;