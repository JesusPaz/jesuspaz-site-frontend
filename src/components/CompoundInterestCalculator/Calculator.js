import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
    Grid, Box, Typography, Card, CardContent, TextField, Button, Select, MenuItem,
    FormControl, InputLabel, Divider, InputAdornment, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Snackbar, Alert, styled, CssBaseline, useTheme, useMediaQuery
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PercentIcon from '@mui/icons-material/Percent';
import InvestmentGrowthChart from './Chart';
import CompoundInterestExplanation from './Explanation';
import InfoIcon from '@mui/icons-material/Info';
import styles from '../../styles/CompoundInterestCalculator.module.css';


export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(0);
    const [frequency, setFrequency] = useState(1);
    const [contribution, setContribution] = useState(0);
    const [contributionFrequency, setContributionFrequency] = useState(1);
    const [result, setResult] = useState([]);
    const [errors, setErrors] = useState({});
    const [finalBalance, setFinalBalance] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [totalGains, setTotalGains] = useState(0);
    const [calculateClicked, setCalculateClicked] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [years, setYears] = useState(0);
    const [interest, setInterest] = useState(0);
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
        setFinalBalance(0);
        setTotalInvested(0);
        setTotalGains(0);
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
        } else if (rateNum > 1000) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés debe ser menor a 1000.";
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
        setIsValid(isValid);
        return isValid;
    };

    const RequiredAsterisk = () => (
        <span style={{ color: 'red' }}>*</span>
    );

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowError(false);
    };

    const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            outline: '1px solid slategrey',
        },
    }));

    const calculateInterest = async () => {
        if (!validateFields()) return;

        const contributionValue = contribution ? contribution : "0";

        try {
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
                    contribution: contributionValue,
                    contributionFrequency
                })
            });

            if (!response.ok) {
                throw new Error('The API is not available right now. Please try again later.');
            }

            const data = await response.json();
            const dataWithInitialInvestment = data.map(item => ({ ...item, Principal: principal }));
            setResult(dataWithInitialInvestment);
            setCalculateClicked(true);
        } catch (error) {
            console.error('Error calculating interest:', error);
            setErrorMessage('There was an error calculating the interest. Please try again later.');
            setShowError(true);
        }
    };

    useEffect(() => {
        if (calculateClicked) {
            const finalBalance = result.length > 0 ? result[result.length - 1].Final_Balance : 0;
            setFinalBalance(finalBalance);

            const totalInvested = result.length > 0 ? parseFloat(principal) + parseFloat(result[result.length - 1].Total_Contributions) : 0;
            setTotalInvested(totalInvested);

            const totalGains = finalBalance - totalInvested;
            setTotalGains(totalGains);

            const yearsValue = result.length > 0 ? result[result.length - 1].Year : 0;
            setYears(yearsValue);

            const interestValue = result.length > 0 ? rate : 0;
            setInterest(interestValue);

            setCalculateClicked(false);
        }
    }, [calculateClicked, principal, rate, result]);

    return (
        <>
            <Helmet>
                <title>Calculadora de Interés Compuesto - Calcula tu Inversión</title>
                <meta name="description" content="Utiliza nuestra calculadora de interés compuesto para calcular el crecimiento de tu inversión a lo largo del tiempo." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": "FinancialCalculator",
                        "name": "Calculadora de Interés Compuesto",
                        "description": "Calcula el crecimiento de tu inversión con interés compuesto.",

                    })}
                </script>
            </Helmet>
            <Grid container spacing={3} className={styles.mainContainer}>
                {/* Sección de la Calculadora */}
                <Grid item xs={12} md={4}>
                    <Card className={styles.calculatorCard}>
                        <CardContent>
                            <Grid item xs={12} md={12}>
                                {/* Paso 1: Inversión Inicial */}
                                <Grid item>
                                    <Typography variant="h6" gutterBottom >Inversión Inicial <RequiredAsterisk /></Typography>
                                    <Typography variant="body1" gutterBottom >Escribe la cantidad inicial que vas a invertir.</Typography>
                                    <TextField
                                        id="principal"
                                        label="Cantidad inicial"
                                        type="number"
                                        value={principal}
                                        onChange={(e) => setPrincipal(e.target.value.replace(/^0+/, ''))}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        helperText={errors.principal}
                                        error={!!errors.principal}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachMoneyIcon />
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
                                    <Typography variant="h6" gutterBottom>Interés <RequiredAsterisk /></Typography>
                                    <Typography variant="body1" gutterBottom>Ingresa el porcentaje de interés que ganará tu inversión.</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="rate"
                                                label="Tasa de interés"
                                                type="number"
                                                value={rate}
                                                onChange={(e) => setRate(e.target.value.replace(/^0+/, ''))}
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                helperText={errors.rate}
                                                error={!!errors.rate}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <PercentIcon />
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
                                    <Typography variant="h6" gutterBottom>Cantidad de Años <RequiredAsterisk /></Typography>
                                    <Typography variant="body1" gutterBottom>Elige la duración de tu inversión en años.</Typography>
                                    <TextField
                                        id="time"
                                        label="Tiempo (en años)"
                                        type="number"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value.replace(/^0+/, ''))}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        helperText={errors.time}
                                        error={!!errors.time}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarTodayIcon />
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
                                                onChange={(e) => setContribution(e.target.value.replace(/^0+/, ''))}
                                                variant="outlined"
                                                margin="normal"
                                                className={styles.formControl}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AttachMoneyIcon />
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


                            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                                Los campos marcados con <RequiredAsterisk /> son obligatorios.
                            </Typography>

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
                                    ${finalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                    ${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box textAlign="center" mb={2} p={2} bgcolor="#f5f5f5" borderRadius={2}>
                                <Typography variant="body1">
                                    Tus ganancias
                                </Typography>
                                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                                    ${totalGains.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>


                    <Grid style={{ width: '100%', height: 400 }}>
                        <InvestmentGrowthChart data={result} />
                    </Grid>

                    <Grid item xs={12}>
                        <Box mt={2}>
                            {result.length > 0 && (
                                <Typography variant="body1">
                                    <br /><br />
                                    <strong>¡Felicidades!</strong> Invertiste <span style={{ color: 'green' }}>${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> y gracias a una tasa de interés anual del <span style={{ color: 'green' }}>{interest}%</span>, en <span style={{ color: 'green' }}>{years} años</span> tu dinero crecerá a <span style={{ color: 'green' }}>${totalGains.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>.
                                    <br />
                                    Este es el poder del interés compuesto: tus ganancias se reinvierten y generan más ganancias, ¡como una bola de nieve que crece sin parar!
                                    <br />
                                    Sigue experimentando con diferentes valores y observa cómo tu dinero puede crecer con el tiempo.
                                </Typography>
                            )}
                        </Box>
                    </Grid>




                </Grid>
                {result.length > 0 && (
                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        <CssBaseline />
                        <StyledTableContainer component={Paper} sx={{ maxHeight: 500 }}>
                            <Table stickyHeader aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}> {/* Cambia el color de fondo del encabezado */}
                                        <TableCell align="center">Año</TableCell>
                                        <TableCell align="center">Balance Inicial</TableCell>
                                        <TableCell align="center">Aportaciones Anuales</TableCell>
                                        <TableCell align="center">Aportaciones Acumuladas</TableCell>
                                        <TableCell align="center">Interés Devengado</TableCell>
                                        <TableCell align="center">Interés Acumulado</TableCell>
                                        <TableCell align="center">Balance Final</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {result.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f5f5f5' } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">{row.Year}</TableCell>
                                            <TableCell align="center">${row.Initial_Balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell align="center">${row.Yearly_Contributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell align="center">${row.Total_Contributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell align="center">${row.Yearly_Interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell align="center">${row.Total_Interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                            <TableCell align="center">${row.Final_Balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </Grid>
                )}

                {/* Sección de la Explicación */}
                <Grid item xs={12}>
                    <CompoundInterestExplanation />
                </Grid>

                <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Grid >
        </>
    );
}
