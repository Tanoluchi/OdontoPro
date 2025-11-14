import { readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import path from "path";

// Busca todos los archivos .prisma en tus módulos
const moduleSchemas = globSync("./src/apis/**/*.prisma");

let schema = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // o mysql/sqlite según tu caso
  url      = env("DATABASE_URL")
}
`;

for (const file of moduleSchemas) {
  const name = path.basename(file);
  schema += `

// ------------- ${name} -------------
${readFileSync(file, "utf8")}
`;
}

writeFileSync("./prisma/schema.prisma", schema);

console.log("✔ schema.prisma generado correctamente.");