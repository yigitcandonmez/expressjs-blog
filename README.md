# Kişisel Blog Dökümantasyonu

## Hakkında

Javascript teknolojisi üzerinde yetkinlik kazanmak adına geliştirmiş olduğum üyelik sisteminin passport.js & MongoDB ile entegre bir şekilde aktif olarak kullanıldığı bir blog sayfası.

### Projede Kullanılan Teknolojiler

- Express.js
- Passport.js
- EJS
- MongoDB & mongoose
- nodeMailer
- bcrypt

### Dosya Mimarisi

Projemde uygulamış olduğum dosya mimarisi;

```
📦Zeiko
 ┣ 📂middleware
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜userFunction.js
 ┃ ┗ 📜userType.js
 ┣ 📂models
 ┃ ┣ 📜blogPost.js
 ┃ ┣ 📜categories.js
 ┃ ┣ 📜comment.js
 ┃ ┗ 📜userSchema.js
 ┣ 📂public
 ┃ ┣ 📂...
 ┣ 📂routes
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜list.js
 ┃ ┃ ┣ 📜login.js
 ┃ ┃ ┗ 📜register.js
 ┃ ┣ 📂post
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜post.js
 ┣ 📂views
 ┃ ┣ 📜admin.ejs
 ┃ ┣ 📜index.ejs
 ┃ ┣ 📜login.ejs
 ┃ ┣ 📜post.ejs
 ┃ ┗ 📜register.ejs
 ┣ 📜app.js
 ┣ 📜README.md
```

#### Geliştirilmeye devam ediyor.

Bir süredir algoritma ve veri yapıları ile ilgilendiğim için projeye dönüp göz atma fırsatım olmadı, yapısal birkaç problemin farkındayım ve en kısa sürede güncelleyeceğim.
