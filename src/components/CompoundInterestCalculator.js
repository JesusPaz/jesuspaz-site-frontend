import { useState } from 'react';

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [time, setTime] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const [contribution, setContribution] = useState(0);

    const calculateInterest = async () => {
        // Collect data and send request to your API
        // Display result to the user
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
            />
            <input
                type="number"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <input
                type="number"
                placeholder="Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            />
            <input
                type="number"
                placeholder="Contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
            />

            <button onClick={calculateInterest}>Calculate</button>
            {/* Display the result here */}
        </div>
    );
}
