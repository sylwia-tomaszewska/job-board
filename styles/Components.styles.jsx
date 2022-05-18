import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.lg};
  margin: 0 auto;
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
`;

const BoxImg = styled(Image)`
  background: no-repeat center;
  background-size: cover;
  width: 6rem;
  height: 6rem;
`;

const BoxContent = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const BoxTop = styled.div``;

const BoxTitle = styled.div``;

const BoxDetails = styled.div``;

export { Container, TopBar, Box, BoxImg, BoxContent, BoxTop, BoxTitle, BoxDetails };
