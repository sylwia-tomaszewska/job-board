import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/Global.styles';
import { Container, TopBar, Box, BoxImg, BoxContent, BoxTop, BoxTitle, BoxDetails } from '../styles/Components.styles';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Head>
          <title>Job listings with filtering</title>
          <meta name='description' content='Frontend Mentor coding challenge' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <TopBar />
        <Container>
          <Box>
            <BoxImg layout='fixed' src='/img/favicon-32x32.png' objectFit='cover' width='6rem' height='6rem' />
            <BoxContent>
              <BoxTop>My Home</BoxTop>
              <BoxTitle></BoxTitle>
              <BoxDetails></BoxDetails>
            </BoxContent>
          </Box>
        </Container>
      </>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://app-heroku-blog.herokuapp.com/api/jobs');
  const data = await res.json();
  const jobs = data.data;

  return {
    props: { jobs },
    revalidate: 10,
  };
}
