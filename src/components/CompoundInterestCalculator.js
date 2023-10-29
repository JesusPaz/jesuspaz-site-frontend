import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
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
    const resetValues = () => {
        setPrincipal(0);
        setRate(0);
        setTime(0);
        setFrequency(1);
        setContribution(0);
        setContributionFrequency(1);
        setResult([]);
    };
    const dummyData = [
        {
            "Year": 1,
            "Total_Contributions": 1200,
            "Total_Interest": 1000.0000000000018,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 2,
            "Total_Contributions": 2400,
            "Total_Interest": 2220.0000000000055,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 3,
            "Total_Contributions": 3600,
            "Total_Interest": 3682.0000000000073,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 4,
            "Total_Contributions": 4800,
            "Total_Interest": 5410.200000000008,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 5,
            "Total_Contributions": 6000,
            "Total_Interest": 7431.220000000012,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 6,
            "Total_Contributions": 7200,
            "Total_Interest": 9774.342000000015,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 7,
            "Total_Contributions": 8400,
            "Total_Interest": 12471.776200000018,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 8,
            "Total_Contributions": 9600,
            "Total_Interest": 15558.953820000024,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 9,
            "Total_Contributions": 10800,
            "Total_Interest": 19074.849202000027,
            "Principal": "10000",
            isDummy: true
        },
        {
            "Year": 10,
            "Total_Contributions": 12000,
            "Total_Interest": 23062.33412220003,
            "Principal": "10000",
            isDummy: true
        }
    ];
    const validateFields = () => {
        let isValid = true;
        let newErrors = {};

        // if (principal <= 0 || !Number.isInteger(principal)) {
        //     isValid = false;
        //     newErrors.principal = "⚠️ El capital inicial debe ser un número entero mayor a 0.";
        // }
        if (principal > 100000000) {
            isValid = false;
            newErrors.principal = "⚠️ El capital inicial debe ser menor a 100000000.";
        }
        if (rate <= 0) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés debe ser mayor a 0.";
        }
        if (rate > 100) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés debe ser menor a 100.";
        }
        // if (!Number.isInteger(time) || time <= 0) {
        //     isValid = false;
        //     newErrors.time = "⚠️ La cantidad de años debe ser un número entero y mayor a 0.";
        // }
        if (time > 200) {
            isValid = false;
            newErrors.time = "⚠️ La cantidad de años debe ser menor a 200.";
        }

        // Validar que la tasa tenga un máximo de 5 decimales
        const decimalPlaces = (rate.toString().split('.')[1] || []).length;
        if (decimalPlaces > 5) {
            isValid = false;
            newErrors.rate = "⚠️ La tasa de interés puede tener hasta 5 decimales.";
        }

        setErrors(newErrors);
        return isValid;
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
        console.log(dataWithInitialInvestment);
        setResult(dataWithInitialInvestment);
    };

    return (
        <Grid container spacing={2}>
            {/* Sección de la Calculadora */}
            <Grid item xs={12} md={4}>
                <div className={styles.calculator}>
                    {/* Paso 1: Inversión Inicial */}
                    <div className={styles.step}>
                        <div className={styles.step}>
                            <h3>Inversión Inicial</h3>
                            <p>Define cuánto dinero inicialmente quieres invertir.</p>
                            <TextField
                                id="principal"
                                label="Cantidad inicial"
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                className={`${styles.fullText} ${errors.principal ? styles.errorField : ''}`}
                                helperText={errors.principal}
                                error={!!errors.principal}
                            // FormHelperTextProps={{
                            //     className: styles.errorText
                            // }}
                            />
                        </div>
                    </div>
                    {/* Paso 2: Interés */}
                    <div className={styles.step}>
                        <div className={styles.step}>
                            <h3>Interés</h3>
                            <p>Establece la tasa de interés y cómo se capitalizará.</p>
                            <div className={styles.stepHalf}>
                                <TextField
                                    id="rate"
                                    label="Tasa de interés"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    className={styles.formControl}
                                    helperText={errors.rate}
                                    error={!!errors.rate}
                                />
                                <FormControl variant="outlined" className={styles.formControl} fullWidth>
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
                            </div>
                        </div>
                    </div>

                    {/* Paso 3: Cantidad de Años */}
                    <div className={styles.step}>
                        <div className={styles.step}>
                            <h3>Cantidad de Años</h3>
                            <p>Define cuántos años mantendrás la inversión.</p>
                            <TextField
                                id="time"
                                label="Tiempo (en años)"
                                type="number"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                className={styles.fullText}
                                helperText={errors.time}
                                error={!!errors.time}
                            />
                        </div>
                    </div>

                    {/* Paso 4: Aportes Periódicos */}
                    <div className={styles.step}>
                        <div className={styles.step}>
                            <h3>Aportes Periódicos</h3>
                            <p>Establece los aportes adicionales que harás y su frecuencia.</p>
                            <div className={styles.stepHalf}>
                                <TextField
                                    id="contribution"
                                    label="Aportes periódicos"
                                    type="number"
                                    value={contribution}
                                    onChange={(e) => setContribution(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    className={styles.formControl}
                                />
                                <FormControl variant="outlined" className={styles.formControl} fullWidth>
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
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                        <Button variant="outlined" color="secondary" className={styles.whiteButton} onClick={() => resetValues()}>
                            Reiniciar
                        </Button>
                        <Button variant="contained" color="primary" className={styles.blueButton} onClick={calculateInterest}>
                            Calcular
                        </Button>
                    </div>
                    {result.length > 0 && (
                        <div className={styles.result}>
                            <p>
                                Tu inversión valdrá {result[result.length - 1].Final_Balance.toFixed(2)} al final del período.
                            </p>
                        </div>
                    )}
                </div>
            </Grid>
            {/* Sección del Gráfico */}
            <Grid item xs={12} md={8}>
                <div style={{ width: '100%', height: 400 }}>
                    <InvestmentGrowthChart data={result.length > 0 ? result : dummyData} />
                </div>
            </Grid>
        </Grid>

    );
}