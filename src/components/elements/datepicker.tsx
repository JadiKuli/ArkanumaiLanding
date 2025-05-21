import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";

export function DatePicker({
  date,
  handleDate,
}: {
  date: Dayjs;
  handleDate: (date: Dayjs) => void;
}) {
  return (
    <div className="relative w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDatePicker
          label="Mobile"
          className="w-full text-[#15173a]"
          value={dayjs(date)}
          onChange={(value: PickerValue) => {
            if (!value) return;
            handleDate(value);
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
