import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import GlobalStyle from '../styles/Global.styles';
import {
  Container,
  BoxContainer,
  TopBar,
  Box,
  BoxImg,
  BoxContent,
  BoxTop,
  BoxMain,
  BoxMainColumn,
  BoxTag,
  BoxTitle,
  BoxFeature,
  BoxDetails,
} from '../styles/Components.styles';

export default function Home({ jobs }) {
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
                <BoxImg layout='fixed' src={job.logo.url} objectFit='cover' width='6rem' height='6rem' />
                <BoxContent>
                  <BoxTop>
                    {job.company}
                    {job.new && <BoxFeature new>New!</BoxFeature>}
                    {job.highlighted && <BoxFeature highlighted>Highlighted</BoxFeature>}
                  </BoxTop>
                  <BoxMain>
                    <BoxMainColumn>
                      <BoxTitle>{job.jobTitle}</BoxTitle>
                      <BoxDetails>
                        <span>{job.publishedAt}</span>
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                      </BoxDetails>
                    </BoxMainColumn>
                    <BoxMainColumn>
                      {job.technology.map((tag, index) => (
                        <BoxTag key={index}>{tag}</BoxTag>
                      ))}
                    </BoxMainColumn>
                  </BoxMain>
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
    if (Date.parse(data)) {
      const date = new Date(data);
      let localeTime = date.toLocaleString('pl-PL');
      return localeTime;
    } else {
      return data;
    }
  };

  const splitTags = (txt) => {
    if (txt) {
      let tagArray = txt.split(',');
      return tagArray;
    }
  };

  const spread = (data) => {
    if (data) {
      if (data.attributes) {
        let attr = Object.fromEntries(Object.entries({ ...data.attributes }).map((entry) => [entry[0], toLocaleTime(entry[1])]));
        let logo = { ...data.attributes.logo.data };

        const spreadData = {
          id: data.id,
          ...attr,
          technology: splitTags(data.attributes.technology),
        };
        if (data.attributes.logo.data) {
          return {
            ...spreadData,
            logo: { ...logo.attributes, url: api + logo.attributes.url },
          };
        } else {
          return {
            ...spreadData,
            logo: { url: 'https://gravatar.com/avatar/c53aaf0bcbc4dd7b9341ab5a6fa1d7b2?s=400&d=robohash&r=x' },
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
    if (data) {
      const element = data.map((elem) => spread(elem));
      return element;
    } else {
      return null;
    }
  };

  const jobs = restructure(dataJobs);
  //   console.log('restructre:', jobs);

  return {
    props: { api, jobs },
    revalidate: 10,
  };
}
