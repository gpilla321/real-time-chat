import React from "react";
import { StyledH4 } from "../../atoms/Common/Common";
import { COLOR } from "../../consts";

interface IProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const ContentWrapper = ({ children, title }: IProps) => {
  return (
    <>
      <StyledH4 color={COLOR.white} marginBottom="0.5em">{title}</StyledH4>
      {children}
    </>
  );
};

export default ContentWrapper;
