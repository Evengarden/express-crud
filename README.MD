Routes
---
    POST api/user/register - регистрация
    POST api/user/login - авторизация
    GET api/profile/:id - получить профиль по ID
    PUT api/profile/:id - изменить профиль
    GET api/profiles/page=? - получить профили с пагинацией

---

Example app/config/config.js
---
const config = {
  JWT_KEY: "yourkey",
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "db",
};

export default config;
---