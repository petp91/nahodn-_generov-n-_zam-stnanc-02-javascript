const fs = require("fs");
const result = require("./result.json");

const maleArr = [];
const femaleArr = [];
const maleFullTimeArr = [];
const femalePartTimeArr = [];

const statisticAllNames = [];
const statisticMaleNames = [];
const statisticFemaleNames = [];
const statisticFemalePartTimeNames = [];
const statisticMaleFullTimeNames = [];

const main = () => {
  result.forEach((value) => {
    value.gender === "male" ? maleArr.push(value) : "";
    value.gender === "female" ? femaleArr.push(value) : "";
    value.gender === "female" && value.workload !== 40
      ? femalePartTimeArr.push(value)
      : "";
    value.gender === "male" && value.workload === 40
      ? maleFullTimeArr.push(value)
      : "";
  });

  const getReducedResultArr = (arr) => {
    const getNames = arr.reduce((allNames, employee) => {
      const currCount = allNames[employee.name] ?? 0;

      return { ...allNames, [employee.name]: currCount + 1 };
    }, {});
    return getNames;
  };

  const chartDataStatistic = (object, arr) => {
    for (let i = 0; i < Object.keys(object).length; i++) {
      arr.push({
        label: Object.keys(object)[i],
        value: Object.values(object)[i],
      });
    }
    return arr;
  };

  const dtoOut = {
    names: {
      all: getReducedResultArr(result),
      male: getReducedResultArr(maleArr),
      female: getReducedResultArr(femaleArr),
      femalePartTime: getReducedResultArr(femalePartTimeArr),
      maleFullTime: getReducedResultArr(maleFullTimeArr),
    },
    chartData: {
      all: chartDataStatistic(getReducedResultArr(result), statisticAllNames),
      male: chartDataStatistic(
        getReducedResultArr(maleArr),
        statisticMaleNames
      ),
      female: chartDataStatistic(
        getReducedResultArr(femaleArr),
        statisticFemaleNames
      ),
      femalePartTime: chartDataStatistic(
        getReducedResultArr(femalePartTimeArr),
        statisticFemalePartTimeNames
      ),
      maleFullTime: chartDataStatistic(
        getReducedResultArr(maleFullTimeArr),
        statisticMaleFullTimeNames
      ),
    },
  };

  return dtoOut;
};

const statistic = main();
const data = JSON.stringify(statistic);
fs.writeFileSync("statistic.json", data);
