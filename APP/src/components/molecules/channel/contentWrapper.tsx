import React from "react";
import { StyledH4 } from "../../atoms/common";
import { COLOR } from "../../consts";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const ContentWrapper = ({ children, title }: IProps) => {
  return (
    <>
      <StyledH4 color={COLOR.white}>{title}</StyledH4>
      {children}
    </>
  );
};

export default ContentWrapper;
