module.exports = {
  type: "postgres",
  host: "postgres",
  username: "postgres",
  password: "admin",
  database: "reception",
  logging: false,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/src/models/index.ts"
      : "src/models/index.js"
  ]
};
