const authBeforeTests = require('./auth/authBefore')
const authAfterTests = require('./auth/authAfter')
const feedTests = require('./feed/feed')
const other = require('./other/other')

other()
authBeforeTests()
feedTests()
authAfterTests()