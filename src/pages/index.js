import React from 'react';
import Resume from '../components/resume/Resume';
import { fetchExperiencesFromContentful } from '../lib/contentfulClient';

export default function Home({ experiences }) {
    return <Resume experiences={experiences} />;
}

export async function getStaticProps() {
    const experiences = await fetchExperiencesFromContentful();
    return {
        props: {
            experiences,
        },
    };
}
