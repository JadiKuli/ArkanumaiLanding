import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "./datepicker";
import { useState } from "react";
import { parseDate } from "@/utils/parseDateCalender";

export default function DateCard({
  handleSetDateBirth,
}: {
  handleSetDateBirth: (date: string) => void;
}) {
  const [date, setDate] = useState<Date>();

  const handleDate = (date: Date) => {
    setDate(date);
  };

  const onSubmit = () => {
    if (!date) return;
    const parse = parseDate(date.toString());

    handleSetDateBirth(parse);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-night-3 text-center">
          When is your birthday?
        </CardTitle>
        <CardDescription className="text-night-3 text-center">
          We'll use it to show your birthday countdown.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DatePicker date={date} handleDate={handleDate} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="bg-night-3 w-full" onClick={onSubmit}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
