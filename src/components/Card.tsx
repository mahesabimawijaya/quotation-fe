import { FC, ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
}

const Card: FC<ICardProps> = ({ children }) => {
  return (
    <div className="max-w-screen-xl overflow-hidden bg-white p-8">
      {children}
    </div>
  );
};

export default Card;
