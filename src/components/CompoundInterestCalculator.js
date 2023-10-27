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
            <h2>Calculadora de interés compuesto</h2>
            <TextField
                id="principal"
                label="Inversión inicial"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                id="contribution"
                label="Contribución"
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <FormControl variant="outlined" className={styles.formControl}>
                <InputLabel id="contribution-frequency-label">Frecuencia de contribución</InputLabel>
                <Select
                    labelId="contribution-frequency-label"
                    id="contribution-frequency"
                    value={contributionFrequency}
                    onChange={(e) => setContributionFrequency(e.target.value)}
                    label="Frecuencia de contribución"
                >
                    <MenuItem value={1}>Anual</MenuItem>
                    <MenuItem value={2}>Semestral</MenuItem>
                    <MenuItem value={4}>Trimestral</MenuItem>
                    <MenuItem value={12}>Mensual</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="time"
                label="Tiempo (en años)"
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                id="rate"
                label="Tasa de interés anual"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                variant="outlined"
                margin="normal"
            />

            <FormControl variant="outlined" className={styles.formControl}>
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