import React from 'react';
import { Paper, Box, Link, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skills from './Skills';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const Resume = ({ experiences }) => {
    return (
        <Box style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h2" style={{ marginBottom: '20px', textAlign: 'center' }}>
                Hey!
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '40px', textAlign: 'center' }}>
                My name is Jesús, I live in <strong>Colombia</strong> and I work as a <strong>Lead DevOps Engineer</strong> at
                <Link href="https://nodesource.com/" target="_blank" rel="noopener" style={{ marginLeft: '5px' }}>
                    NodeSource
                </Link>. In this startup, we create an <strong>APM for Node.js</strong> that is
                <Link href="https://github.com/nodesource" target="_blank" rel="noopener" style={{ marginLeft: '5px' }}>
                    open source
                </Link>. Additionally, we maintain an open source repository with more than <strong>100 million downloads</strong> of Node.js packages per year.
            </Typography>
            <Divider style={{ margin: '40px 0' }} />
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                Professional Experience
            </Typography>

            {experiences.map((exp, index) => (
                <Paper key={index} elevation={3} style={{ margin: '20px 0', padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                            {exp.roleposition} @
                            <Link href={exp.companyLink} target="_blank" rel="noopener" style={{ marginLeft: '5px' }}>
                                {exp.companyName}
                            </Link>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </Typography>
                    </div>
                    {exp.description && (
                        <Typography variant="body2" style={{ marginBottom: '10px' }}>
                            {documentToReactComponents(exp.description)}
                        </Typography>
                    )}
                </Paper>
            ))}
            <Divider style={{ margin: '40px 0' }} />
            <Skills />
        </Box>
    );
};

export default Resume;
