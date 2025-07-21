# API LIST

**userRouter**

- [POST] /login
- [POST] /signup
- [POST] /logout

**profileRouter**

- [GET] /profile/view
- [PATCH] /profile/edit
- [PATCH] /profile/password

**statusRouter**

- [GET] /status/intrested/:requestedId
- [GET] /status/rejected/:requestedId
- [GET] /status/ignored/:receivedId
- [GET] /status/accepted/:receivedId

**connectionRouter**

- [GET] /connection/view
- [GET] /connection/feeds
- [GET] /connection/request

**status**

- | accepted | rejected | ignored | interested |

