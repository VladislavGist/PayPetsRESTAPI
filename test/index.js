const authBeforeTests = require('./auth/authBefore')
const authAfterTests = require('./auth/authAfter')
const feedTests = require('./feed/feed')

authBeforeTests()
feedTests()
authAfterTests()