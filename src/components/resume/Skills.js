import React from 'react';
import { Box, Grid, Tooltip, Zoom, Typography } from '@mui/material';
import { FaAws, FaDocker, FaGithub, FaPython } from 'react-icons/fa';
import { SiMicrosoftazure, SiAnsible, SiChef, SiTerraform, SiJenkins, SiGrafana, SiPrometheus, SiElasticsearch, SiKubernetes, SiHelm, SiGitlab, SiGithubactions, SiBitrise, SiGnubash, SiPowershell } from 'react-icons/si';
import styles from '../../styles/SkillStyles.module.css';

const skillStyle = {
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    margin: 'auto',
};

const SkillItem = ({ icon, title }) => {
    return (
        <Grid item xs={4} sm={3} md={2} lg={2} style={{ display: 'flex', justifyContent: 'center' }}>
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
                    {React.cloneElement(icon, { fontSize: 'xxx-large' })}
                </Box>
            </Tooltip>
        </Grid>
    );
};



const Skills = () => {
    return (
        <Box style={{ padding: '40px' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
                Skills
            </Typography>
            <Grid container spacing={2}>
                {/* Cloud Platforms */}
                <SkillItem icon={<FaAws />} title="AWS" />
                <SkillItem icon={<SiMicrosoftazure />} title="Azure" />

                {/* Containerization */}
                <SkillItem icon={<FaDocker />} title="Docker" />
                <SkillItem icon={<SiKubernetes />} title="Kubernetes" />
                <SkillItem icon={<SiHelm />} title="Helm" />

                {/* Infrastructure as Code (IaC) */}
                <SkillItem icon={<SiTerraform />} title="Terraform" />

                {/* CI/CD */}
                <SkillItem icon={<SiJenkins />} title="Jenkins" />
                <SkillItem icon={<SiGitlab />} title="GitLab CI" />
                <SkillItem icon={<FaGithub />} title="GitHub" />
                <SkillItem icon={<SiBitrise />} title="Bitrise" />

                {/* Monitoring & Logging */}
                <SkillItem icon={<SiGrafana />} title="Grafana" />
                <SkillItem icon={<SiPrometheus />} title="Prometheus" />
                <SkillItem icon={<SiElasticsearch />} title="Elasticsearch" />

                {/* Scripting */}
                <SkillItem icon={<FaPython />} title="Python" />
                <SkillItem icon={<SiGnubash />} title="Bash" />
                <SkillItem icon={<SiPowershell />} title="PowerShell" />

                {/* Configuration Management */}
                <SkillItem icon={<SiAnsible />} title="Ansible" />
                <SkillItem icon={<SiChef />} title="Chef" />
            </Grid>
        </Box>
    );
};

export default Skills;
