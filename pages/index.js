import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/Global.styles';
import { Container, BoxContainer, TopBar, Box, BoxImg, BoxContent, BoxTop, BoxTitle, BoxDetails } from '../styles/Components.styles';

export default function Home({ api, formattedDate, jobs }) {
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
        {jobs[1].company}
        {/* <BoxContainer>
          {jobs &&
            jobs.map((job) => (
              <Box key={job.id}>
                <BoxImg layout='fixed' src={api + job.attributes.Logo.data.attributes.url} objectFit='cover' width='6rem' height='6rem' />
                <BoxContent>
                  <BoxTop>{job.attributes.Company}</BoxTop>
                  <BoxTitle>{job.attributes.JobTitle}</BoxTitle>
                  <BoxTitle></BoxTitle>
                  <BoxDetails>
                    <span>{formattedDate}</span>
                    <span>{job.attributes.Type}</span>
                    <span>{job.attributes.Location}</span>
                  </BoxDetails>
                </BoxContent>
              </Box>
            ))}
        </BoxContainer> */}
        <BoxContainer>
          {jobs &&
            jobs.map((job) => (
              <Box key={job.id}>
                <BoxImg layout='fixed' src={job.logo.url} objectFit='cover' width='6rem' height='6rem' />
                <BoxContent>
                  <BoxTop>{job.company}</BoxTop>
                  <BoxTitle>{job.jobTitle}</BoxTitle>
                  <BoxTitle></BoxTitle>
                  <BoxDetails>
                    <span>{job.publishedAt}</span>
                    <span>{job.type}</span>
                    <span>{job.location}</span>
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

  const dataJobs = await fetch(`${api}/api/jobs?populate=*`)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => {
      console.error('Error:', error);
    });

  //   const spread = (data) => {
  //     if (data) {
  //       if (!data.isArray) {
  //         for (let key in data) {
  //           console.log(key);
  //           if (data[key].attributes) {
  //             return {
  //               id: data[key].id,
  //               ...data[key].attributes,
  //             };
  //           } else {
  //             return data[key];
  //           }
  //         }
  //       } else {
  //         console.log('Is Array');
  //         console.log(typeof data, data);
  //       }
  //     }
  //   };

  const toLocaleTime = (data) => {
    if (Date.parse(data) == true) {
      const date = new Date(data);
      let localeTime = date.toLocaleString('pl-PL');
      return localeTime;
    } else {
      return data;
    }
  };

  const spread = (data) => {
    if (data) {
      if (data.attributes) {
        let logo = { ...data.attributes.logo.data };
        let pubDate = toLocaleTime(data.attributes.publishedAt);

        const spreadData = {
          id: data.id,
          ...data.attributes,
          publishedAt: pubDate,
        };
        if (data.attributes.logo.data) {
          return {
            ...spreadData,
            logo: { ...logo.attributes, url: api + logo.attributes.url },
          };
        } else {
          return {
            ...spreadData,
            logo: { url: 'https://dssconf.pl/i/dss-logo.d5965ea8.svg' },
          };
        }
        // if (data.attributes.logo.data) {
        //   return {
        //     id: data.id,
        //     ...data.attributes,
        //     publishedAt: pubDate,
        //     logo: { ...logo.attributes, url: api + logo.attributes.url },
        //   };
        // } else {
        //   return {
        //     id: data.id,
        //     ...data.attributes,
        //     publishedAt: pubDate,
        //     logo: { url: 'https://dssconf.pl/i/dss-logo.d5965ea8.svg' },
        //   };
        // }
      } else {
        return data;
      }
    }
  };

  const restructure = (data) => {
    console.log('Data', data);
    // for (let key in data) {
    //   console.log('Key', key);
    //   if (Object.hasOwnProperty.call(data, key)) {
    //     const element = data[key];
    //     return spread(element);
    //   }
    // }
    // data.forEach((elem) => {
    //   //   console.log('Elem', elem);
    //   spread(elem);
    //   console.log('Rest', spread(elem));
    //   return spread(elem);
    // });
    const element = data.map((elem) => spread(elem));
    return element;
  };

  const jobs = restructure(dataJobs);
  console.log('restructre:', jobs);

  return {
    props: { api, jobs },
    revalidate: 10,
  };
}
