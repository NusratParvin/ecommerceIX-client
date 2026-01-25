import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { FilterProps } from "../../salesTrend";

interface SelectSalesTrendProps {
  setFilters?: (filters: FilterProps) => void;
}

const SelectSalesTrend = ({ setFilters }: SelectSalesTrendProps) => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());

  const monthsArray = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years: string[] = [];

  for (let i = 2025; i <= currentYear; i++) {
    years.push(i.toString());
  }
  //   console.log(currentYear);

  const availableMonths = useMemo(() => {
    if (selectedYear === currentYear.toString()) {
      return monthsArray.slice(0, currentMonth);
    } else return monthsArray;
  }, [selectedYear, currentYear, currentMonth]);
  //   console.log(availableMonths);
  useEffect(() => {
    if (setFilters && selectedMonth && selectedYear) {
      setFilters({ month: selectedMonth, year: selectedYear });
    }
  }, [selectedMonth, selectedYear, setFilters]);

  useEffect(() => {
    const monthExists = availableMonths.some((m) => m.value === selectedMonth);

    if (!monthExists && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0].value);
    }
  }, [selectedYear, availableMonths]);

  return (
    <div className="flex gap-2 text-xs ">
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-[120px]  focus:ring-0 h-7 text-xs">
          <SelectValue
            className="text-slate-300 text-xs"
            placeholder="Select month"
          />
        </SelectTrigger>
        <SelectContent>
          {availableMonths.map((m) => (
            <SelectItem key={m.value} value={m.value} className="text-xs">
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[100px] focus:ring-0 h-7 text-xs">
          <SelectValue className="text-slate-300 " placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y} className="text-xs">
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSalesTrend;
