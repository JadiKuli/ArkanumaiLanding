// src/context/BirthDateContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

type BirthDateContextType = {
  dateBirth: string;
  setDateBirth: (date: string) => void;
};

const BirthDateContext = createContext<BirthDateContextType | undefined>(
  undefined,
);

export const BirthDateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dateBirth, setDateBirthState] = useState<string>("");

  // Ambil dari localStorage saat pertama kali load
  useEffect(() => {
    const savedDate = localStorage.getItem("dateBirth");
    if (savedDate) {
      setDateBirthState(savedDate);
    }
  }, []);

  // Simpan ke localStorage setiap kali berubah
  const setDateBirth = (date: string) => {
    localStorage.setItem("dateBirth", date);
    setDateBirthState(date);
  };

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
