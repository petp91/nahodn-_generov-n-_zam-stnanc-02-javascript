const Crypto = require("crypto");
const fs = require("fs");

const maleFirstName = require("./maleFirstName.json");
const maleSurname = require("./maleSurname.json");
const femaleFirstName = require("./femaleFirstName.json");
const femaleSurname = require("./femaleSurname.json");
const genderArr = require("./genderArr.json");
const workloadArr = require("./workloadArr.json");

let gender;
//funkce pro generování náhodného indexu pole
const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};
//funkce pro generování pohlaví
function randomGender() {
  gender = genderArr[getRandomIndex(genderArr)];
  return gender;
}
//funkce pro generování náhodného jména
function randomName() {
  let firstName =
    gender === "male"
      ? maleFirstName[getRandomIndex(maleFirstName)]
      : femaleFirstName[getRandomIndex(femaleFirstName)];
  return firstName;
}
//funkce pro generování náhodného příjmení
function randomSurname() {
  let surname =
    gender === "male"
      ? maleSurname[getRandomIndex(maleSurname)]
      : femaleSurname[getRandomIndex(femaleSurname)];
  return surname;
}
//funkce pro generování náhodného workload
function randomWorkload() {
  let workload = workloadArr[getRandomIndex(workloadArr)];
  return workload;
}

const dtoIn = {
  count: 50,
  age: {
    min: 19,
    max: 35,
  },
};

//fce pomocí cyklu while náhodně naplňí pole dtoOut objekty s informacemi o daném zaměstnanci
const main = (count) => {
  //funkce pro generování náhodného datumu
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  // nastavení rozmezí let
  const newYearMin = new Date().getFullYear() - dtoIn.age.min;
  const newYearMax = new Date().getFullYear() - dtoIn.age.max;

  //Ošetření vstupních dat
  if (isNaN(count)) {
    return "Špatně zadaná vstupní data";
  } else if (count > 100) {
    return "Maximální počet zaměstnanců je 100";
  }

  let employees = [];

  for (let i = 0; i < count; i++) {
    employees.push({
      id: Crypto.randomBytes(8).toString("hex"),
      gender: randomGender(),
      name: randomName(),
      surname: randomSurname(),
      birthday: randomDate(
        new Date(newYearMax, 0, 1),
        new Date(newYearMin, 0, 1)
      ),
      workload: randomWorkload(),
    });
  }

  return employees;
};

const result = main(dtoIn.count);

const data = JSON.stringify(result);
fs.writeFileSync("result.json", data);
