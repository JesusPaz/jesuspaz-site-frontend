import { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import styles from '../styles/CompoundInterestCalculator.module.css';


export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(0);
    const [frequency, setFrequency] = useState(1);
    const [contribution, setContribution] = useState(0);
    const [contributionFrequency, setContributionFrequency] = useState(1);
    const [result, setResult] = useState([]);

    const calculateInterest = async () => {
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
        setResult(data);
    };

    return (
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
                        className={styles.formControl}
                    />
                </div>
            </div>
            {/* Paso 4: Interés */}
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
                                <MenuItem value={1}>Anual</MenuItem>
                                <MenuItem value={2}>Semestral</MenuItem>
                                <MenuItem value={4}>Trimestral</MenuItem>
                                <MenuItem value={12}>Mensual</MenuItem>
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
                        className={styles.formControl}
                    />
                </div>
            </div>

            {/* Paso 2: Aportes Periódicos */}
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
                                <MenuItem value={1}>Anual</MenuItem>
                                <MenuItem value={2}>Semestral</MenuItem>
                                <MenuItem value={4}>Trimestral</MenuItem>
                                <MenuItem value={12}>Mensual</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>


            <Button variant="contained" color="primary" onClick={calculateInterest}>
                Calcular
            </Button>
            {result.length > 0 && (
                <div className={styles.result}>
                    <p>
                        Tu inversión valdrá {result[result.length - 1].Final_Balance.toFixed(2)} al final del período.
                    </p>
                </div>
            )}
        </div>
    );
}