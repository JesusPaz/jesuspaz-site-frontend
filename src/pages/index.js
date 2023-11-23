// pages/index.js
import React from 'react';
import Resume from '../components/resume/Resume';
const contentful = require('contentful');

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


const client = contentful.createClient({
    space: 's0ek5jy9iwqe',
    accessToken: '9HxEhHUw73iC_4G0yduZDuyXlJqaMPd2N23LnZp_HAM',
});


async function fetchExperiencesFromContentful() {
    try {
        const response = await client.getEntries({
            content_type: 'experience',
            order: 'fields.startDate'
        });

        if (response.items.length > 0) {
            return response.items.map(item => item.fields);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al obtener datos de Contentful:", error);
        return [];
    }
}
