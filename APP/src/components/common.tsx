import styled from "styled-components";

export const StyledH1 = styled.h1`
  margin: 0;
`;
export const StyledH2 = styled.h2``;
export const StyledH3 = styled.h3<{
  fontWeight?: string;
  marginBottom?: string;
}>`
  font-weight: normal;
  margin: 0;

  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom};`}
`;
