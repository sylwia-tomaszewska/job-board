import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/Global.styles';
import { Container, BoxContainer, TopBar, Box, BoxImg, BoxContent, BoxTop, BoxTitle, BoxDetails } from '../styles/Components.styles';

export default function Home({ jobs, api }) {
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
        <BoxContainer>
          {jobs &&
            jobs.map((job) => (
              <Box key={job.id}>
                <BoxImg layout='fixed' src={api + job.attributes.Logo.data.attributes.url} objectFit='cover' width='6rem' height='6rem' />
                <BoxContent>
                  <BoxTop>{job.attributes.Company}</BoxTop>
                  <BoxTitle>{job.attributes.JobTitle}</BoxTitle>
                  <BoxTitle></BoxTitle>
                  <BoxDetails>
                    <span>{job.attributes.Published}</span>
                    <span>{job.attributes.publishedAt}</span>
                    <span>{job.attributes.Type}</span>
                    <span>{job.attributes.Location}</span>
                  </BoxDetails>
                </BoxContent>
              </Box>
            ))}
        </BoxContainer>
      </>
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const api = process.env.API_URL;
  const res = await fetch('https://app-heroku-blog.herokuapp.com/api/jobs?populate=*');
  const data = await res.json();
  const jobs = data.data;
  console.log(jobs[1].attributes.Logo.data);
  return {
    props: { jobs, api },
    revalidate: 10,
  };
}
