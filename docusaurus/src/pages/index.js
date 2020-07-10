import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Get started in seconds</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
      You don't need to learn and configure a host of build tools - instant reloading helps you focus on development. 
      When it's time to deploy, your bundles are automatically optimized.
      </>
    ),
  },
  {
    title: <>Demystified Walmart Infra</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        electrode is a Walmart production-ready platform. 
        We have invested time to figure out the boring stuff so that you can focus on building amazing customer experiences.
      </>
    ),
  },
  {
    title: <>Fully Extensible</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
             "We test electrode to make sure that all of its underlying pieces work together seamlessly – no complicated version mismatches. 
             electrode also gives you absolute control over Babel, Webpack, and electrode native tools.",

      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary-lighter', styles.heroBanner)}>
        <div className="container">
        <img 
                alt="Test setup"
                src={useBaseUrl('img/oss_hero.png')
                }/>;
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
         
            <Link
              className={classnames(
                'button button--outline button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
