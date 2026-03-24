import fs from "fs";
import path from "path";
import YAML from "yaml";
import { faker } from "@faker-js/faker";

const ROOT = process.cwd();
const SWAGGER_PATH = path.join(ROOT, "docs", "swagger.yaml");
const SPEC_PATH = path.join(ROOT, "specification", "swagger.yaml");

const CITIES = [
  "Paris",
  "Cologne",
  "Brussels",
  "Amsterdam",
  "Hamburg",
  "Dusseldorf",
];

function genLoginExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}

function genOfferExample() {
  return {
    title: faker.lorem.words(15).slice(0, 100),
    description: faker.lorem.sentences(5),
    publishDate: faker.date.recent().toISOString().slice(0, 10),
    city: faker.helpers.arrayElement(CITIES),
    isPremium: faker.datatype.boolean(),
    rating: Number(
      faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    ),
    type: faker.helpers.arrayElement(["apartment", "house", "room", "hotel"]),
    rooms: faker.number.int({ min: 1, max: 8 }),
    guests: faker.number.int({ min: 1, max: 10 }),
    price: faker.number.int({ min: 100, max: 10000 }),
    features: JSON.stringify([
      "Breakfast",
      "Air conditioning",
      "Laptop friendly workspace",
    ]),
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
    userId: faker.number.int({ min: 1, max: 10 }),
  };
}

const raw = fs.readFileSync(SWAGGER_PATH, "utf-8");
const doc = YAML.parse(raw);

const loginContent =
  doc?.paths?.["/login"]?.post?.requestBody?.content?.["application/json"];
if (!loginContent) {
  console.error(
    "Не найден /login POST requestBody content application/json — проверь swagger.yaml",
  );
  process.exit(1);
}

loginContent.example = genLoginExample();

const offerContent =
  doc?.paths?.["/offers"]?.post?.requestBody?.content?.["multipart/form-data"];

if (offerContent) {
  offerContent.examples = {
    generated: {
      summary: "Сгенерированный пример (только текстовые поля)",
      value: genOfferExample(),
    },
  };
}

const out = YAML.stringify(doc);
fs.writeFileSync(SWAGGER_PATH, out, "utf-8");
fs.mkdirSync(path.dirname(SPEC_PATH), { recursive: true });
fs.writeFileSync(SPEC_PATH, out, "utf-8");

console.log("Готово:", SWAGGER_PATH);
console.log("Синхронизировано:", SPEC_PATH);
