import { useState } from "react";
import {
  Card,
  Form,
  FormBorder,
  FormInput,
  FormInputs,
  Result,
  Results,
} from "./components";

export default function App() {
  const [inputDay, setInputDay] = useState(null);
  const [inputMonth, setInputMonth] = useState(null);
  const [inputYear, setInputYear] = useState(null);

  const [ageDay, setAgeDay] = useState("--");
  const [ageMonth, setAgeMonth] = useState("--");
  const [ageYear, setAgeYear] = useState("--");

  const InputsData = [
    {
      name: "day",
      value: inputDay,
      setVal: setInputDay,
      resValue: ageDay,
      setResValue: setAgeDay,
      placeholder: "DD",
      isEmp: inputDay === 0,
      isValid: () => isValidDay(inputDay),
      onChange: (e) => setInputDay(Number(e.target.value.replace(/\D/gi, ""))),
    },
    {
      name: "month",
      value: inputMonth,
      setVal: setInputMonth,
      resValue: ageMonth,
      setResValue: setAgeMonth,
      placeholder: "MM",
      isEmp: inputMonth === 0,
      isValid: () => isValidMonth(inputMonth),
      onChange: (e) =>
        setInputMonth(Number(e.target.value.replace(/\D/gi, ""))),
    },
    {
      name: "year",
      value: inputYear,
      setVal: setInputYear,
      resValue: ageYear,
      setResValue: setAgeYear,
      placeholder: "YYYY",
      isEmp: inputYear === 0,
      isValid: () => isValidYear(inputYear),
      onChange: (e) => setInputYear(Number(e.target.value.replace(/\D/gi, ""))),
    },
  ];

  function isValidDay(day) {
    return day === null ? true : 0 < day && day < 32 && day % 1 === 0;
  }

  function isValidMonth(month) {
    return month === null ? true : 0 < month && month < 13 && month % 1 === 0;
  }

  function isValidYear(year) {
    return year === null
      ? true
      : 0 <= year && year <= new Date().getFullYear() && year % 1 === 0;
  }

  function calcAge(d1, m1, y1) {
    // (past = 1, now = 2)
    let now = new Date();
    let [d2, m2, y2] = [now.getDate(), now.getMonth() + 1, now.getFullYear()];

    // if (date past >= date now) {throw error}

    if (d2 < d1) {
      // add 30 days to d2 and sub 1 month from m2
      d2 += 30;
      m2 -= 1;
    }
    setAgeDay(d2 - d1);

    if (m2 < m1) {
      // add 12 months to m2 and sub 1 year from y2
      m2 += 12;
      y2 -= 1;
    }
    setAgeMonth(m2 - m1);

    // if (y2 > y1) {throw error}
    // it's impossible to y2 is be less than y1! age cannot be negative.
    setAgeYear(y2 - y1);
  }

  function handleSubmit(e) {
    e.preventDefault();

    InputsData.forEach((info) => {
      if (info.value === null || info.isEmp || !info.isValid()) {
        info.setVal("");
      }
    });

    if (InputsData.some((info) => info.isEmp || !info.isValid())) return;

    // if (InputsData.reduce((a, b) => a || (!b.isEmp && b.isVal), false))
    calcAge(inputDay, inputMonth, inputYear);
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormInputs>
          {InputsData.map((info) => (
            <FormInput
              name={info.name}
              value={info.value}
              placeholder={info.placeholder}
              isEmp={info.isEmp}
              isValid={info.isValid}
              onChange={info.onChange}
              key={info.name}
            />
          ))}
        </FormInputs>
        <FormBorder />
      </Form>
      <Results>
        <Result val={ageYear} name="years" />
        <Result val={ageMonth} name="months" />
        <Result val={ageDay} name="days" />
      </Results>
    </Card>
  );
}
