import { useState } from 'react';
import {
    TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Typography, Card, CardContent, useTheme, useMediaQuery, Divider, InputAdornment
} from '@mui/material';
import AttachMoney from '@mui/icons-material/AttachMoney';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Percent from '@mui/icons-material/Percent';
import styles from '../styles/CompoundInterestCalculator.module.css';
import InvestmentGrowthChart from '../components/charts/InvestmentGrowthChart';



export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(0);
    const [frequency, setFrequency] = useState(1);
    const [contribution, setContribution] = useState(0);
    const [contributionFrequency, setContributionFrequency] = useState(1);
    const [result, setResult] = useState([]);
    const [errors, setErrors] = useState({});
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const resetValues = () => {
        setPrincipal(0);
        setRate(0);
        setTime(0);
        setFrequency(1);
        setContribution(0);
        setContributionFrequency(1);
        setResult([]);
    };
    const validateFields = () => {
        let isValid = true;
        let newErrors = {};

        const principalNum = Number(principal);
        const rateNum = Number(rate);
        const timeNum = Number(time);
        const contributionNum = Number(contribution);

        if (principalNum <= 0 || !Number.isInteger(principalNum)) {
            isValid = false;
            newErrors.principal = "⚠️ El capital inicial debe ser un número entero mayor a 0.";
        } else if (principalNum > 100000000) {
            isValid = false;
            newErrors.principal = "⚠️ El capital inicial debe ser menor a 100,000,000.";
        }

        if (rateNum <= 0) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés debe ser mayor a 0.";
        } else if (rateNum > 100) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés debe ser menor a 100.";
        }

        // Validar que la tasa tenga un máximo de 5 decimales
        const decimalPlaces = (rateNum.toString().split('.')[1] || []).length;
        if (decimalPlaces > 5) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés puede tener hasta 5 decimales.";
        }

        if (!Number.isInteger(timeNum) || timeNum <= 0) {
            isValid = false;
            newErrors.time = "⚠️ La cantidad de años debe ser un número entero y mayor a 0.";
        } else if (timeNum > 200) {
            isValid = false;
            newErrors.time = "⚠️ La cantidad de años debe ser menor a 200.";
        }

        // Validaciones para los aportes periódicos
        if (!Number.isInteger(Number(contributionNum)) || contributionNum < -100000000 || contributionNum > 100000000) {
            isValid = false;
            newErrors.contribution = "⚠️ Los aportes periódicos deben ser un número entero entre -100,000,000 y 100,000,000.";
        }

        setErrors(newErrors);
        return isValid;
    };

    const getFinalBalance = () => {
        if (result.length > 0) {
            return result[result.length - 1].Final_Balance;
        }
        return 0;
    };

    const getTotalInvested = () => {
        if (result.length > 0) {
            const lastItem = result[result.length - 1];
            return parseFloat(principal) + parseFloat(lastItem.Total_Contributions);
        }
        return 0;
    };

    const getTotalGains = () => {
        if (result.length > 0) {
            return getFinalBalance() - getTotalInvested();
        }
        return 0;
    };
    const calculateInterest = async () => {
        if (!validateFields()) return;
        const response = await fetch(`${process.env.API_URL}/finance/compound-interest`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                principal,
                rate,
                time,
                frequency,
                contribution,
                contributionFrequency
            })
        });

        const data = await response.json();
        const dataWithInitialInvestment = data.map(item => ({ ...item, Principal: principal }));
        setResult(dataWithInitialInvestment);
    };

    return (
        <Grid container spacing={3} className={styles.mainContainer}>
            {/* Sección de la Calculadora */}
            <Grid item xs={12} md={4}>
                <Card className={styles.calculatorCard}>
                    <CardContent>
                        <Grid item xs={12} md={12}>
                            {/* Paso 1: Inversión Inicial */}
                            <Grid item spacing={2}>
                                <Typography variant="h6" gutterBottom >Inversión Inicial</Typography>
                                <Typography variant="body1" gutterBottom >Escribe la cantidad inicial que vas a invertir.</Typography>
                                <TextField
                                    id="principal"
                                    label="Cantidad inicial"
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    helperText={errors.principal}
                                    error={!!errors.principal}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AttachMoney />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={styles.divider} />
                            </Grid>

                            {/* Paso 2: Interés */}
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Interés</Typography>
                                <Typography variant="body1" gutterBottom>Ingresa el porcentaje de interés que ganará tu inversión.</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="rate"
                                            label="Tasa de interés"
                                            type="number"
                                            value={rate}
                                            onChange={(e) => setRate(e.target.value)}
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            helperText={errors.rate}
                                            error={!!errors.rate}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Percent />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" fullWidth margin="normal">
                                            <InputLabel id="frequency-label">Frecuencia de capitalización</InputLabel>
                                            <Select
                                                labelId="frequency-label"
                                                id="frequency"
                                                value={frequency}
                                                onChange={(e) => setFrequency(e.target.value)}
                                                label="Frecuencia de capitalización"
                                            >
                                                <MenuItem value={1}>cada año</MenuItem>
                                                <MenuItem value={2}>dos veces al año</MenuItem>
                                                <MenuItem value={4}>cada tres meses</MenuItem>
                                                <MenuItem value={12}>cada mes</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={styles.divider} />
                            </Grid>

                            {/* Paso 3: Cantidad de Años */}

                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom>Cantidad de Años</Typography>
                                <Typography variant="body1" gutterBottom>Elige la duración de tu inversión en años.</Typography>
                                <TextField
                                    id="time"
                                    label="Tiempo (en años)"
                                    type="number"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    helperText={errors.time}
                                    error={!!errors.time}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarToday />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={styles.divider} />
                            </Grid>
                            {/* Paso 4: Aportes Periódicos */}

                            <Grid item xs={12} >
                                <Typography variant="h6" gutterBottom>Aportes Periódicos</Typography>
                                <Typography variant="body1" gutterBottom>Determina tus pagos extras y cuán a menudo los harás.</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="contribution"
                                            label="Aportes periódicos"
                                            type="number"
                                            value={contribution}
                                            onChange={(e) => setContribution(e.target.value)}
                                            variant="outlined"
                                            margin="normal"
                                            className={styles.formControl}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AttachMoney />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" margin="normal" fullWidth>
                                            <InputLabel id="contribution-frequency-label">Frecuencia de los aportes</InputLabel>
                                            <Select
                                                labelId="contribution-frequency-label"
                                                id="contribution-frequency"
                                                value={contributionFrequency}
                                                onChange={(e) => setContributionFrequency(e.target.value)}
                                                label="Frecuencia de los aportes"
                                            >
                                                <MenuItem value={1}>cada año</MenuItem>
                                                <MenuItem value={2}>dos veces al año</MenuItem>
                                                <MenuItem value={4}>cada tres meses</MenuItem>
                                                <MenuItem value={12}>cada mes</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant="middle" className={styles.divider} />
                        </Grid>

                        {/* Paso 5: Botones */}

                        <Grid className={styles.buttonContainer}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth={isSmallScreen}
                                        onClick={() => resetValues()}
                                        className={styles.button}
                                    >
                                        Reiniciar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth={isSmallScreen}
                                        onClick={calculateInterest}
                                        className={styles.button}
                                    >
                                        Calcular
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card >
            </Grid >

            {/* Sección del Gráfico */}
            <Grid item xs={12} md={8} style={{ marginTop: '40px' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Box textAlign="center" mb={2}>
                            <Typography variant="h3" color="primary" style={{ fontWeight: 'bold' }}>
                                ${getFinalBalance().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                            <Typography variant="h6">
                                Total al final
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box textAlign="center" mb={2} p={2} bgcolor="#f5f5f5" borderRadius={2}>
                            <Typography variant="body1">
                                Tu inversión
                            </Typography>
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                ${getTotalInvested().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box textAlign="center" mb={2} p={2} bgcolor="#f5f5f5" borderRadius={2}>
                            <Typography variant="body1">
                                Tus ganancias
                            </Typography>
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                ${getTotalGains().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Typography>
                        </Box>
                    </Grid>

                </Grid>

                <div style={{ width: '100%', height: 400 }}>
                    <InvestmentGrowthChart data={result} />
                </div>
            </Grid>
        </Grid >

    );
}