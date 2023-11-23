import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud'; // Ejemplo de icono para plataformas en la nube
import DockerIcon from '@mui/icons-material/Dock'; // Ejemplo de icono para contenedores
import CodeIcon from '@mui/icons-material/Code'; // Ejemplo de icono para IaC, CI/CD, etc.
import StorageIcon from '@mui/icons-material/Storage'; // Ejemplo de icono para monitoreo y logging
import SettingsIcon from '@mui/icons-material/Settings'; // Ejemplo de icono para configuración

const SkillCategory = ({ title, children }) => {
    return (
        <Box marginBottom={4}>
            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '10px' }}>{title}</Typography>
            <Grid container spacing={2}>
                {children}
            </Grid>
        </Box>
    );
};

const SkillItem = ({ icon, title }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
                {icon}
                <Typography variant="h6" style={{ marginTop: '10px' }}>{title}</Typography>
            </Box>
        </Grid>
    );
};

const Skills = () => {
    return (
        <Box style={{ padding: '40px', maxWidth: '800px', margin: 'auto' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                Skills
            </Typography>
            <SkillCategory title="Cloud Platforms">
                <SkillItem icon={<CloudIcon />} title="AWS" />
                <SkillItem icon={<CloudIcon />} title="Azure" />
            </SkillCategory>
            <SkillCategory title="Containerization">
                <SkillItem icon={<DockerIcon />} title="Docker" />
                <SkillItem icon={<DockerIcon />} title="Kubernetes" />
                <SkillItem icon={<DockerIcon />} title="Helm" />
            </SkillCategory>
            <SkillCategory title="Infrastructure as Code (IaC)">
                <SkillItem icon={<CodeIcon />} title="Terraform" />
                <SkillItem icon={<CodeIcon />} title="CloudFormation" />
            </SkillCategory>

            <SkillCategory title="Monitoring & Logging">
                <SkillItem icon={<StorageIcon />} title="Grafana" />
                <SkillItem icon={<StorageIcon />} title="Prometheus" />
                <SkillItem icon={<StorageIcon />} title="ELK Stack" />
            </SkillCategory>
            <SkillCategory title="Scripting">
                <SkillItem icon={<StorageIcon />} title="Python" />
                <SkillItem icon={<StorageIcon />} title="Bash" />
                <SkillItem icon={<StorageIcon />} title="PowerShell" />
            </SkillCategory>
            <SkillCategory title="Configuration Management">
                <SkillItem icon={<SettingsIcon />} title="Ansible" />
                <SkillItem icon={<SettingsIcon />} title="Chef" />
            </SkillCategory>
            <SkillCategory title="CI/CD">
                <SkillItem icon={<CodeIcon />} title="Jenkins" />
                <SkillItem icon={<CodeIcon />} title="GitLab CI" />
                <SkillItem icon={<CodeIcon />} title="GitHub Actions" />
            </SkillCategory>
        </Box>
    );
};

export default Skills;
