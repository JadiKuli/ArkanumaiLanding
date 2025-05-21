// src/context/BirthDateContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type BirthDateContextType = {
  dateBirth: string;
  setDateBirth: (date: string) => void;
};

const BirthDateContext = createContext<BirthDateContextType | undefined>(
  undefined,
);

export const BirthDateProvider = ({ children }: { children: ReactNode }) => {
  const [dateBirth, setDateBirth] = useState<string>("");

  return (
    <BirthDateContext.Provider value={{ dateBirth, setDateBirth }}>
      {children}
    </BirthDateContext.Provider>
  );
};

export const useBirthDate = () => {
  const context = useContext(BirthDateContext);
  if (!context) {
    throw new Error("useBirthDate must be used within a BirthDateProvider");
  }
  return context;
};
