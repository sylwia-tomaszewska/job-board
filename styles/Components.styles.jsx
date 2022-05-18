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

const BoxTop = styled.div``;

const BoxTitle = styled.div``;

const BoxDetails = styled.div``;

export { Container, BoxContainer, TopBar, Box, BoxImg, BoxContent, BoxTop, BoxTitle, BoxDetails };
