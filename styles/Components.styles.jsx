import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.lg};
  margin: 0 auto;
`;

const BoxContainer = styled(Container)`
  display: grid;
  gap: 1rem;
  :first-of-type {
    margin-top: 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.prim} url('/img/bg-header-desktop.svg') center no-repeat;
  background-size: cover;
  height: 6rem;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const BoxImg = styled.img`
  background: no-repeat center;
  background-size: cover;
  width: 4rem;
  height: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.lighter};
  border-radius: 50%;
`;

const BoxContent = styled.div`
  display: grid;
`;

const BoxColumn = styled.div``;

const BoxTop = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 0.5rem;
  align-items: center;
  max-width: max-content;
  color: ${({ theme }) => theme.colors.prim};
  font-size: ${({ theme }) => theme.fonts.sm};
  font-weight: bold;
`;

const BoxTag = styled.span`
  padding: 0.5em 0.75em 0.25em;
  background: ${({ theme }) => theme.colors.prim};
  border-radius: 0.25em;
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.sm};
  text-transform: uppercase;
`;

const BoxTitle = styled.div`
  color: ${({ theme }) => theme.colors.prim};
  font-weight: bold;
`;

const BoxFeature = styled.span`
  padding: 0.5em 0.75em 0.25em;
  background: ${(props) => (props.new ? props.theme.colors.prim : props.theme.colors.dark)};
  border-radius: 2em;
  color: ${({ theme }) => theme.colors.light};
  font-size: ${({ theme }) => theme.fonts.xs};
  font-weight: normal;
  text-transform: uppercase;
  line-height: 1;
`;

const BoxDetails = styled.div``;

export { Container, BoxContainer, TopBar, Box, BoxImg, BoxContent, BoxColumn, BoxTop, BoxTag, BoxTitle, BoxFeature, BoxDetails };
