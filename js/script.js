document.ontouchmove = function(event){
  event.preventDefault();
}

const FAMILY_BUDGET = 50000;
const PERSONAL_BUDGET = 12000;
const BUDGET_MONTH_START = 5;

const familyDailyBudget = FAMILY_BUDGET / 31;
const personalDailyBudget = PERSONAL_BUDGET / 31;

function daysInMonth(month, year) {
  month += 1;
  return new Date(year, month, 0).getDate();
}

function formatNumber(number) {
  return Math.ceil(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function declenseDay(dd) {
  switch (true) {
    case dd == 1 || dd == 21 || dd == 31:
      return 'день';
    case dd == 2 || dd == 3 || dd == 4 || dd == 22 || dd == 23 || dd == 24:
      return 'дня';
    default:
      return 'дней';
  }
}

const currentDate = new Date();
const dd = currentDate.getDate();
const mm = currentDate.getMonth();
const yy = currentDate.getYear();
const daysInCurrentMonth = daysInMonth(mm, yy);

const daysLeft = dd >= BUDGET_MONTH_START
  ? daysInCurrentMonth - dd + BUDGET_MONTH_START
  : BUDGET_MONTH_START - dd;

const familyRoublesLeft = daysLeft * familyDailyBudget;
const familyRoublesDay = familyRoublesLeft/daysLeft;

const personalRoublesLeft = daysLeft * personalDailyBudget;
const personalRoublesDay = personalRoublesLeft/daysLeft;

document.getElementById('days-left').innerHTML = 'До конца бюджетного месяца ' + daysLeft + '&nbsp;' + declenseDay(daysLeft);

document.getElementById('family-budget-amount').innerHTML = formatNumber(familyRoublesLeft) + '&nbsp;&#8381;';
document.getElementById('family-budget-daily').innerHTML = formatNumber(familyRoublesDay) + '&nbsp;&#8381; в день';

document.getElementById('personal-budget-amount').innerHTML = formatNumber(personalRoublesLeft) + '&nbsp;&#8381;';
document.getElementById('personal-budget-daily').innerHTML = formatNumber(personalRoublesDay) + '&nbsp;&#8381; в день';