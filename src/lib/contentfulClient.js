const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export async function fetchExperiencesFromContentful() {
    try {
        const response = await client.getEntries({
            content_type: 'experience',
            order: '-fields.startDate'
        });

        return response.items.length > 0 ? response.items.map(item => item.fields) : [];
    } catch (error) {
        console.error("Error in data from Contentful:", error);
        return [];
    }
}
