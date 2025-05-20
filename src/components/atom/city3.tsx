import { motion } from "motion/react";

function City3({ theme, className }: { theme: string; className: string }) {
  return (
    <motion.svg
      viewBox="0 0 703 233"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ translateY: 0 }}
      transition={{ duration: 2, delay: 4 }}
      initial={{ translateY: 500 }}
    >
      <path
        d="M206.562 73.9609H211.282V78.7129H215.561V79.7881H214.67V84.8174H224.607V86.2188H223.208V94.9658H234.033V96.4209H232.515V232H175.554V96.4209H174.033V94.9658H184.861V86.2188H183.462V84.8174H193.399V79.7881H191.849V78.7129H196.786V73.9609H201.507V64.5059H203.078V73.9609H204.989V57H206.562V73.9609Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
      <path
        d="M104.224 77.1064H107.737L109.863 81.9688H124.094V89.416H161.336V94.3164H166.033V98.1445H163.881V232.11H88.1836V98.1445H86.0332V94.3164H90.7275V89.416H96.1328V77.1064H102.655V68.418H104.224V77.1064ZM103.438 66C104.217 66.001 104.848 66.542 104.848 67.209C104.848 67.876 104.217 68.417 103.438 68.417C102.661 68.417 102.029 67.876 102.029 67.209C102.029 66.542 102.66 66 103.438 66Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
      <path
        d="M703 232H631.876L623 50L703 65.1672V232Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
      <path
        d="M392.669 122.532V62.4316H381.488V46.3332H377.494V22.7216H355.487V5.3694H353.528V22.7216H349.217V1H347.26V22.7216H333.347V62.4316H326.161V122.532H320V232H397V122.532H392.669Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
      <path
        d="M4.33132 121.532V61.4316H15.5121V45.3332H19.5065V21.7216H41.5131V4.3694H43.4716V21.7216H47.7829V0H49.7405V21.7216H63.653V61.4316H70.8395V121.532H77V231H-7.56525e-07V121.532H4.33132Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
      <path
        d="M303.033 232H243.033V153.385H247.879V154.383L256.821 153.05V151.169H261.667V152.328L270.61 150.995V148.868H275.456V150.273L284.398 148.94V146.993H289.244V148.219L298.188 146.886V145H303.033V232Z"
        className={`transition duration-500 ${theme === "dark" ? "fill-night-4" : "fill-day-4"}`}
      />
    </motion.svg>
  );
}

export default City3;
