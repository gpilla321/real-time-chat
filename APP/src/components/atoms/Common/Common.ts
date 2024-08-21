import styled from "styled-components";

interface HeadingStyles {
  fontWeight?: string;
  marginBottom?: string;
  color?: string;
}

export const StyledH1 = styled.h1<HeadingStyles>`
  margin: 0;
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.color && `color: ${props.color};`}
`;
export const StyledH2 = styled.h2<HeadingStyles>`
  font-weight: normal;
  margin: 0;
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.color && `color: ${props.color};`}
`;
export const StyledH3 = styled.h3<HeadingStyles>`
  font-weight: normal;
  margin: 0;

  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.color && `color: ${props.color};`}
`;

export const StyledH4 = styled.h4<HeadingStyles>`
  font-weight: normal;
  margin: 0;
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
  ${(props) => props.color && `color: ${props.color};`}
`;
