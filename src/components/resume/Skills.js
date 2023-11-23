import React from 'react';
import { Box, Grid, Tooltip, Zoom, Typography } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import DockerIcon from '@mui/icons-material/Dock';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from '../../styles/SkillStyles.module.css';


const skillStyle = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px', // Aumentado el tamaño del Box
    width: '120px',
    borderRadius: '50%',
    margin: 'auto',
};

const SkillItem = ({ icon, title }) => {
    return (
        <Grid item xs={4} sm={3} md={2} lg={1}>
            <Tooltip
                title={title}
                placement="bottom"
                TransitionComponent={Zoom}
                classes={{
                    tooltip: styles.skillTooltip,
                    arrow: styles.skillTooltipArrow
                }}
                arrow
            >
                <Box
                    className="skill-icon"
                    sx={{
                        ...skillStyle,
                        // marginBottom: '-10px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.8)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {React.cloneElement(icon, { fontSize: 'large' })}
                </Box>
            </Tooltip>
        </Grid>
    );
};



const Skills = () => {
    return (
        <Box style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                Skills
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
                <SkillItem icon={<CloudIcon />} title="AWS" />
                <SkillItem icon={<CloudIcon />} title="Azure" />
                <SkillItem icon={<DockerIcon />} title="Docker" />
                {/* ... otros íconos de habilidades ... */}
            </Box>
        </Box>
    );
};

export default Skills;
