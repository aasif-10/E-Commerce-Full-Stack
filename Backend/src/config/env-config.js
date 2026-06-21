const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL_USER = process.env.EMAIL_USER;

if (!PORT) {
  throw new Error("PORT environment variable is not set");
}

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

if (!CLIENT_ID) {
  throw new Error("CLIENT_ID environment variable is not set");
}

if (!CLIENT_SECRET) {
  throw new Error("CLIENT_SECRET environment variable is not set");
}

if (!REFRESH_TOKEN) {
  throw new Error("REFRESH_TOKEN environment variable is not set");
}

if (!EMAIL_USER) {
  throw new Error("EMAIL_USER environment variable is not set");
}

const envConfig = {
  PORT: PORT,
  MONGODB_URI: MONGODB_URI,
  JWT_SECRET: JWT_SECRET,
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  REFRESH_TOKEN: REFRESH_TOKEN,
  EMAIL_USER: EMAIL_USER,
};

module.exports = envConfig;
